export interface Work {
  start: Date
  end: Date
  content: string
}

export type WorkString = {
  start: string
  end: string
  content: string
}

export const workFromStringObject = (work: WorkString): Work => {
  return {
    start: new Date(work.start),
    end: new Date(work.end),
    content: work.content,
  }
}

export const worksFromStringObjects = (works: WorkString[]): Work[] => {
  return works.map((work) => workFromStringObject(work))
}
