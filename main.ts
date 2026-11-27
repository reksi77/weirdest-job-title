// Weirdest Job Title: Blind Judge Showdown
// Writes one job title (60 characters max, nothing else) to /output/entry.txt.
//
// The title: "Official Seagull Negotiator, Pier 39"
// A real-sounding bureaucratic job (an official negotiator) with one
// gloriously specific twist: the other party at the table is a flock of
// seagulls, at a named real place — Pier 39, San Francisco, famous for
// its birds. You can picture the person at once: clipboard in hand,
// hi-vis vest, trying to talk gulls out of stealing chips.
// Deterministic: same title, same bytes, every run. No network, no
// randomness, no clock reads.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TITLE = "Official Seagull Negotiator, Pier 39";
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate: UTF-8 text, 1-60 characters, not only whitespace.
  const chars = [...TITLE].length;
  if (chars < 1 || chars > 60) {
    throw new Error(`title is ${chars} characters, must be 1-60`);
  }
  if (TITLE.trim().length === 0) {
    throw new Error("title must not be only whitespace");
  }

  // Create /output if needed. Never remove the directory itself:
  // in the grader it is a mount point.
  mkdirSync(OUT_DIR, { recursive: true });

  // No trailing newline: the gate counts characters, and the title
  // must be exactly the title, nothing else.
  writeFileSync(OUT_FILE, TITLE, "utf8");

  // Read-back check: the file on disk must be byte-for-byte the title.
  // If the write was truncated or mangled, fail loudly instead of
  // shipping a broken entry.
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== TITLE) {
    throw new Error(`read-back mismatch: wrote ${JSON.stringify(TITLE)}, read ${JSON.stringify(written)}`);
  }
}

main();
