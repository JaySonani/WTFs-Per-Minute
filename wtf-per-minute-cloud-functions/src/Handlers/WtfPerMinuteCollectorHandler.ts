import {Request, Response} from 'express';
import {CollectorInterface} from '../Collector/Repositories/FirestoreCollector';
import {CollectorRequestFactoryInterface} from '../Collector/Events/Requests/CollectorRequestFactory';
import CollectorRequest from '../Collector/Events/Requests/CollectorRequest';
import CollectorRequestEventContentException from '../Collector/Events/Requests/Exceptions/CollectorRequestEventContentException';

export default class WtfPerMinuteCollectorHandler {
  private req: Request;
  private res: Response;
  private _eventFactory: CollectorRequestFactoryInterface;
  private _collector: CollectorInterface;

  constructor(
    req: Request,
    res: Response,
    eventFactory: CollectorRequestFactoryInterface,
    analyzerTrigger: CollectorInterface
  ) {
    this.req = req;
    this.res = res;
    this._eventFactory = eventFactory;
    this._collector = analyzerTrigger;
  }

  public async handle(): Promise<void> {
    if (this.assertRequestIsApplicationJsonBased()) {
      this.return400ErrorRegardingContentType();
      return;
    }

    const collectorRequest =
      this.getCollectorRequestOrReturn422ForMissingFields();
    if (collectorRequest === null) {
      return;
    }

    await this.collectRequest(collectorRequest);
  }

  private async collectRequest(
    collectorRequest: CollectorRequest
  ): Promise<void> {
    await this._collector.collect(collectorRequest);
    this.prepare201HandledResponse();
  }

  private prepare201HandledResponse() {
    this.res.statusCode = 201;
    this.res.contentType('application/json');
    this.res.send({
      accepted: true,
    });
  }

  private getCollectorRequestOrReturn422ForMissingFields(): CollectorRequest | null {
    try {
      return this._eventFactory.createFromObject(this.req.body);
    } catch (error) {
      if (error instanceof CollectorRequestEventContentException) {
        this.prepare422ErrorRegardingMissingElement(error);
        return null;
      }
      throw error;
    }
  }

  private prepare422ErrorRegardingMissingElement(
    error: CollectorRequestEventContentException
  ) {
    this.res.statusCode = 422;
    this.res.contentType('application/json');
    this.res.send({
      accepted: false,
      reason: error.message,
      missingElement: error.missingElement,
    });
  }

  private return400ErrorRegardingContentType() {
    this.res.statusCode = 400;
    this.res.contentType('application/json');
    this.res.send({
      accepted: false,
      reason: 'Unsupported content-type',
    });
  }

  private assertRequestIsApplicationJsonBased() {
    return this.req.header('content-type') !== 'application/json';
  }
}
