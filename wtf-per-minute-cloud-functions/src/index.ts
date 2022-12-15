import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import {Firestore} from '@google-cloud/firestore';
import CollectorRequestFactory, {
  CollectorRequestFactoryInterface,
} from './Collector/Events/Requests/CollectorRequestFactory';
import WtfPerMinuteCollectorHandler from './Handlers/WtfPerMinuteCollectorHandler';
import FirestoreCollector, {
  CollectorInterface,
} from './Collector/Repositories/FirestoreCollector';

export const WtfPerMinuteCollector: HttpFunction = async (req, res) => {
  const requestFactory: CollectorRequestFactoryInterface =
    new CollectorRequestFactory();
  const firestoreClient: Firestore = new Firestore();
  const collector: CollectorInterface = new FirestoreCollector(firestoreClient);

  const handler = new WtfPerMinuteCollectorHandler(
    req,
    res,
    requestFactory,
    collector
  );
  await handler.handle();
};
