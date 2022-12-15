export default class CollectorRequest {
  public readonly project: string;
  public readonly file: string;
  public readonly line: number;
  public readonly sample: CollectorRequestSample;
  public readonly reason: string;
  public readonly timestamp: Date;
  public readonly user: string;

  constructor(
    project: string,
    file: string,
    line: number,
    sample: CollectorRequestSample,
    reason: string,
    timestamp: Date,
    user: string
  ) {
    this.project = project;
    this.file = file;
    this.line = line;
    this.sample = sample;
    this.reason = reason;
    this.timestamp = timestamp;
    this.user = user;
  }
}

export class CollectorRequestSample {
  public readonly target: string;
  public readonly before: string;
  public readonly after: string;

  constructor(target: string, before: string, after: string) {
    this.target = target;
    this.before = before;
    this.after = after;
  }
}
