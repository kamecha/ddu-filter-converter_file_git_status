
/*
 * XY PATH
 * XY ORIG_PATH -> PATH
 */
export type Entity = {
	X: " " | "M" | "T" | "A" | "D" | "R" | "C" | "U" | "?" | "!";
	Y: " " | "M" | "T" | "A" | "D" | "R" | "C" | "U" | "?" | "!";
	path: string;
	origPath?: string;
}

/**
 * Parse a line from git status
 * @param A line from git status
 * @returns An entity
 * @example
 * parse("?? foo.txt") // { X: "?", Y: "?", path: "foo.txt" }
 * parse("?? foo.txt -> bar.txt") // { X: "?", Y: "?", path: "bar.txt", origPath: "foo.txt" }
 */
export function parse(line: string): Entity | undefined {
	const entityWithOrigPathPattern = /^([ MTADRCU?!])([ MTADRCU?!]) (.+) -> (.+)$/;
	const entityPattern = /^([ MTADRCU?!])([ MTADRCU?!]) (.+)$/;
	if (line.match(entityWithOrigPathPattern)) {
		const [, X, Y, origPath, path] = line.match(entityWithOrigPathPattern)!;
    return { X, Y, origPath, path } as Entity;
	}
	if (line.match(entityPattern)) {
		const [, X, Y, path] = line.match(entityPattern)!;
		return { X, Y, path } as Entity;
	}
	return undefined;
}

