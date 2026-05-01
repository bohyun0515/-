import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, program } = req.body;

    if (!name || !phone || !program) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      throw new Error('Notion 환경변수가 설정되지 않았습니다.');
    }

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        '이름': {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        '연락처': {
          rich_text: [
            {
              text: {
                content: phone,
              },
            },
          ],
        },
        '프로그램': {
          rich_text: [
            {
              text: {
                content: program,
              },
            },
          ],
        },
      },
    });

    return res.status(200).json({ message: '성공' });
  } catch (error) {
    console.error('Notion API Error:', error);
    return res.status(500).json({ message: '서버 오류', error: error.message });
  }
}
