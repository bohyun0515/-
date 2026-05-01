const { Client } = require('@notionhq/client');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let parsedBody = req.body;
    if (typeof req.body === 'string') {
      try {
        parsedBody = JSON.parse(req.body);
      } catch (e) {
        console.error("JSON 파싱 에러:", e);
      }
    }

    const { name, phone, program } = parsedBody || {};

    if (!name || !phone || !program) {
      return res.status(400).json({ 
        message: '모든 필드를 입력해주세요. (디버깅: ' + JSON.stringify(parsedBody) + ')' 
      });
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      throw new Error('Notion 환경변수가 설정되지 않았습니다.');
    }

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        '고객명': {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        '전화번호': {
          phone_number: phone,
        },
        '프로그램': {
          select: {
            name: '필라테스',
          },
        },
        '문의내용': {
          rich_text: [
            {
              text: {
                content: `상담 희망: ${program}`,
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
