import CollectorRequest from '../Events/Requests/CollectorRequest';
import {CollectionReference, Firestore, WithFieldValue} from '@google-cloud/firestore';

export interface CollectorInterface {
  collect(event: CollectorRequest): Promise<void>;
}

export default class FirestoreCollector implements CollectorInterface {
  private firestoreClient: Firestore;

  constructor(firestoreClient: Firestore) {
    this.firestoreClient = firestoreClient;
  }

  async collect(event: CollectorRequest): Promise<void> {
    const firestoreModel: WithFieldValue<any> = {
      project: event.project,
      file: event.file,
      line: event.line,
      sample: {
        target: event.sample.target,
        before: event.sample.before,
        after: event.sample.after
      },
      reason: event.reason,
      timestamp: event.timestamp,
      user: event.user
    }
    await this.pushMessageToFirestore(firestoreModel);
  }

  private async pushMessageToFirestore(data: WithFieldValue<any>) {
    const collection: CollectionReference = this.firestoreClient.collection('wtf-per-minute');
    return await collection.add(data);
  }
}
