import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("shows the first three comments and replies before the expanded controls", async () => {
  const component = await readFile(new URL("../app/FieldComments.tsx", import.meta.url), "utf8");

  assert.match(component, /const COMMENT_PREVIEW_LIMIT = 3/);
  assert.match(component, /useEffect\(\(\) => \{ void load\(\); \}, \[load\]\)/);
  assert.match(component, /open \? comments : comments\.slice\(0, COMMENT_PREVIEW_LIMIT\)/);
  assert.match(component, /visibleComments\.map/);
  assert.match(component, /展开评论与回复/);
  assert.match(component, /\{open && <button type="button" disabled=\{saving\}/);
});
