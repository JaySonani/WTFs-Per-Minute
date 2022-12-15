export default class CollectorRequestEventContentException extends Error {
  public readonly missingElement: string;

  constructor(missingElement: string) {
    super(
      'The content passed to the parser is missing a key and cannot generate the event object'
    );
    this.missingElement = missingElement;
  }
}
