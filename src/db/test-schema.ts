import { db } from './index'; // 你的 db 连接实例
import { notes, tags, noteTags } from './schema';
import { eq } from 'drizzle-orm';

async function testSchema() {
  console.log("🚀 Starting Schema Test...");

  try {
    // 1. 清理旧数据 (可选，测试环境常用)
    // await db.delete(noteTags);
    // await db.delete(notes);
    // await db.delete(tags);

    // 2. 插入测试标签
    console.log("插入标签...");
    const [newTag] = await db.insert(tags).values({
      label: "React",
      color: "#61dafb"
    }).returning();

    // 3. 插入测试笔记
    console.log("插入笔记...");
    const [newNote] = await db.insert(notes).values({
      title: "Learning Drizzle",
      content: "Testing many-to-many relationship with Neon.",
      status: "active"
    }).returning();

    // 4. 建立关联 (测试 noteTags 表)
    console.log("建立多对多关联...");
    await db.insert(noteTags).values({
      noteId: newNote.id,
      tagId: newTag.id
    });

    // 5. 验证查询 (连表查询)
    console.log("执行连表查询验证...");
    const result = await db
      .select()
      .from(notes)
      .leftJoin(noteTags, eq(notes.id, noteTags.noteId))
      .leftJoin(tags, eq(noteTags.tagId, tags.id))
      .where(eq(notes.id, newNote.id));

    console.log("✅ 测试成功！查询结果:", JSON.stringify(result, null, 2));

  } catch (error) {
    console.error("❌ 测试失败:", error);
  }
}

testSchema();