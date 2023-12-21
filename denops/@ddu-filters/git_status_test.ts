import { parse } from "./git_status.ts";
import { assertEquals } from "https://deno.land/x/ddu_vim@v2.8.3/deps.ts";

// not updated

Deno.test(" A foo.txt", () => {
	assertEquals(parse(" A foo.txt"), { X: " ", Y: "A", path: "foo.txt" })
})

Deno.test(" M foo.txt", () => {
	assertEquals(parse(" M foo.txt"), { X: " ", Y: "M", path: "foo.txt" })
})

Deno.test(" D foo.txt", () => {
	assertEquals(parse(" D foo.txt"), { X: " ", Y: "D", path: "foo.txt" })
})

// updated in index

Deno.test("M  foo.txt", () => {
	assertEquals(parse("M  foo.txt"), { X: "M", Y: " ", path: "foo.txt" })
})

Deno.test("MM foo.txt", () => {
	assertEquals(parse("MM foo.txt"), { X: "M", Y: "M", path: "foo.txt" })
})

Deno.test("MT foo.txt", () => {
	assertEquals(parse("MT foo.txt"), { X: "M", Y: "T", path: "foo.txt" })
})

Deno.test("MD foo.txt", () => {
	assertEquals(parse("MD foo.txt"), { X: "M", Y: "D", path: "foo.txt" })
})

// type changed in index

Deno.test("T  foo.txt", () => {
	assertEquals(parse("T  foo.txt"), { X: "T", Y: " ", path: "foo.txt" })
})

Deno.test("TM foo.txt", () => {
	assertEquals(parse("TM foo.txt"), { X: "T", Y: "M", path: "foo.txt" })
})

Deno.test("TT foo.txt", () => {
	assertEquals(parse("TT foo.txt"), { X: "T", Y: "T", path: "foo.txt" })
})

Deno.test("TD foo.txt", () => {
	assertEquals(parse("TD foo.txt"), { X: "T", Y: "D", path: "foo.txt" })
})

// added to index

Deno.test("A  foo.txt", () => {
	assertEquals(parse("A  foo.txt"), { X: "A", Y: " ", path: "foo.txt" })
})

Deno.test("AM foo.txt", () => {
	assertEquals(parse("AM foo.txt"), { X: "A", Y: "M", path: "foo.txt" })
})

Deno.test("AT foo.txt", () => {
	assertEquals(parse("AT foo.txt"), { X: "A", Y: "T", path: "foo.txt" })
})

Deno.test("AD foo.txt", () => {
	assertEquals(parse("AD foo.txt"), { X: "A", Y: "D", path: "foo.txt" })
})

// deleted from index

Deno.test("D  foo.txt", () => {
	assertEquals(parse("D  foo.txt"), { X: "D", Y: " ", path: "foo.txt" })
})

// renamed in index

Deno.test("R  foo.txt", () => {
	assertEquals(parse("R  foo.txt"), { X: "R", Y: " ", path: "foo.txt" })
})

Deno.test("RM foo.txt", () => {
	assertEquals(parse("RM foo.txt"), { X: "R", Y: "M", path: "foo.txt" })
})

Deno.test("RT foo.txt", () => {
	assertEquals(parse("RT foo.txt"), { X: "R", Y: "T", path: "foo.txt" })
})

Deno.test("RD foo.txt", () => {
	assertEquals(parse("RD foo.txt"), { X: "R", Y: "D", path: "foo.txt" })
})

// copied in index

Deno.test("C  foo.txt", () => {
	assertEquals(parse("C  foo.txt"), { X: "C", Y: " ", path: "foo.txt" })
})

Deno.test("CM foo.txt", () => {
	assertEquals(parse("CM foo.txt"), { X: "C", Y: "M", path: "foo.txt" })
})

Deno.test("CT foo.txt", () => {
	assertEquals(parse("CT foo.txt"), { X: "C", Y: "T", path: "foo.txt" })
})

Deno.test("CD foo.txt", () => {
	assertEquals(parse("CD foo.txt"), { X: "C", Y: "D", path: "foo.txt" })
})

// index and work tree matches

Deno.test("M  foo.txt", () => {
	assertEquals(parse("M  foo.txt"), { X: "M", Y: " ", path: "foo.txt" })
})

Deno.test("T  foo.txt", () => {
	assertEquals(parse("T  foo.txt"), { X: "T", Y: " ", path: "foo.txt" })
})

Deno.test("A  foo.txt", () => {
	assertEquals(parse("A  foo.txt"), { X: "A", Y: " ", path: "foo.txt" })
})

Deno.test("R  foo.txt", () => {
	assertEquals(parse("R  foo.txt"), { X: "R", Y: " ", path: "foo.txt" })
})

Deno.test("C  foo.txt", () => {
	assertEquals(parse("C  foo.txt"), { X: "C", Y: " ", path: "foo.txt" })
})

// work tree changed since index

Deno.test(" M foo.txt", () => {
	assertEquals(parse(" M foo.txt"), { X: " ", Y: "M", path: "foo.txt" })
})

Deno.test("MM foo.txt", () => {
	assertEquals(parse("MM foo.txt"), { X: "M", Y: "M", path: "foo.txt" })
})

Deno.test("TM foo.txt", () => {
	assertEquals(parse("TM foo.txt"), { X: "T", Y: "M", path: "foo.txt" })
})

Deno.test("AM foo.txt", () => {
	assertEquals(parse("AM foo.txt"), { X: "A", Y: "M", path: "foo.txt" })
})

Deno.test("RM foo.txt", () => {
	assertEquals(parse("RM foo.txt"), { X: "R", Y: "M", path: "foo.txt" })
})

Deno.test("CM foo.txt", () => {
	assertEquals(parse("CM foo.txt"), { X: "C", Y: "M", path: "foo.txt" })
})

// type changed in work tree since index

Deno.test(" T foo.txt", () => {
	assertEquals(parse(" T foo.txt"), { X: " ", Y: "T", path: "foo.txt" })
})

Deno.test("MT foo.txt", () => {
	assertEquals(parse("MT foo.txt"), { X: "M", Y: "T", path: "foo.txt" })
})

Deno.test("TT foo.txt", () => {
	assertEquals(parse("TT foo.txt"), { X: "T", Y: "T", path: "foo.txt" })
})

Deno.test("AT foo.txt", () => {
	assertEquals(parse("AT foo.txt"), { X: "A", Y: "T", path: "foo.txt" })
})

Deno.test("RT foo.txt", () => {
	assertEquals(parse("RT foo.txt"), { X: "R", Y: "T", path: "foo.txt" })
})

Deno.test("CT foo.txt", () => {
	assertEquals(parse("CT foo.txt"), { X: "C", Y: "T", path: "foo.txt" })
})

// deleted in work tree

Deno.test(" D foo.txt", () => {
	assertEquals(parse(" D foo.txt"), { X: " ", Y: "D", path: "foo.txt" })
})

Deno.test("MD foo.txt", () => {
	assertEquals(parse("MD foo.txt"), { X: "M", Y: "D", path: "foo.txt" })
})

Deno.test("TD foo.txt", () => {
	assertEquals(parse("TD foo.txt"), { X: "T", Y: "D", path: "foo.txt" })
})

Deno.test("AD foo.txt", () => {
	assertEquals(parse("AD foo.txt"), { X: "A", Y: "D", path: "foo.txt" })
})

Deno.test("RD foo.txt", () => {
	assertEquals(parse("RD foo.txt"), { X: "R", Y: "D", path: "foo.txt" })
})

Deno.test("CD foo.txt", () => {
	assertEquals(parse("CD foo.txt"), { X: "C", Y: "D", path: "foo.txt" })
})

// renamed in work tree

Deno.test(" R foo.txt", () => {
	assertEquals(parse(" R foo.txt"), { X: " ", Y: "R", path: "foo.txt" })
})

// copied in work tree

Deno.test(" C foo.txt", () => {
	assertEquals(parse(" C foo.txt"), { X: " ", Y: "C", path: "foo.txt" })
})

// unmerged, both deleted

Deno.test("DD foo.txt", () => {
	assertEquals(parse("DD foo.txt"), { X: "D", Y: "D", path: "foo.txt" })
})

// unmerged, added by us

Deno.test("AU foo.txt", () => {
	assertEquals(parse("AU foo.txt"), { X: "A", Y: "U", path: "foo.txt" })
})

// unmerged, deleted by them

Deno.test("UD foo.txt", () => {
	assertEquals(parse("UD foo.txt"), { X: "U", Y: "D", path: "foo.txt" })
})

// unmerged, added by them

Deno.test("UA foo.txt", () => {
	assertEquals(parse("UA foo.txt"), { X: "U", Y: "A", path: "foo.txt" })
})

// unmerged, deleted by us

Deno.test("DU foo.txt", () => {
	assertEquals(parse("DU foo.txt"), { X: "D", Y: "U", path: "foo.txt" })
})

// unmerged, both added

Deno.test("AA foo.txt", () => {
	assertEquals(parse("AA foo.txt"), { X: "A", Y: "A", path: "foo.txt" })
})

// unmerged, both modified

Deno.test("UU foo.txt", () => {
	assertEquals(parse("UU foo.txt"), { X: "U", Y: "U", path: "foo.txt" })
})

// untracked

Deno.test("?? foo.txt", () => {
	assertEquals(parse("?? foo.txt"), { X: "?", Y: "?", path: "foo.txt" })
})

// ignored

Deno.test("!! foo.txt", () => {
	assertEquals(parse("!! foo.txt"), { X: "!", Y: "!", path: "foo.txt" })
})


Deno.test("?? foo.txt -> bar.txt", () => {
	assertEquals(parse("?? foo.txt -> bar.txt"), { X: "?", Y: "?", path: "bar.txt", origPath: "foo.txt" })
})
