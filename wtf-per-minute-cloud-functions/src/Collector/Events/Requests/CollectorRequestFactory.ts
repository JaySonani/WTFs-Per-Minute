import CollectorRequest, {CollectorRequestSample} from './CollectorRequest';
import CollectorRequestEventContentException from './Exceptions/CollectorRequestEventContentException';
import {parseISO} from 'date-fns';

interface ValidatedContentStructure {
    project: string;
    file: string;
    line: number;
    sample: {
        target: string;
        before: string;
        after: string;
    };
    reason: string;
    timestamp: string;
    user: string;
}

export interface CollectorRequestFactoryInterface {
    createFromObject(content: object): CollectorRequest;
}

export default class CollectorRequestFactory
    implements CollectorRequestFactoryInterface {
    createFromObject(content: object): CollectorRequest {
        const validatedContent =
            CollectorRequestFactory.validateObjectKeys(content);

        const sample: CollectorRequestSample = new CollectorRequestSample(
            validatedContent.sample.target,
            validatedContent.sample.before,
            validatedContent.sample.after
        );

        return new CollectorRequest(
            validatedContent.project,
            validatedContent.file,
            validatedContent.line,
            sample,
            validatedContent.reason,
            parseISO(validatedContent.timestamp),
            validatedContent.user
        );
    }

    private static validateObjectKeys(
        parsedContent: object
    ): ValidatedContentStructure {
        if (!('project' in parsedContent)) {
            throw new CollectorRequestEventContentException('project');
        }

        if (!('file' in parsedContent)) {
            throw new CollectorRequestEventContentException('file');
        }

        if (!('line' in parsedContent)) {
            throw new CollectorRequestEventContentException('line');
        }

        if (!('reason' in parsedContent)) {
            throw new CollectorRequestEventContentException('reason');
        }

        if (!('timestamp' in parsedContent)) {
            throw new CollectorRequestEventContentException('timestamp');
        }

        if (!('user' in parsedContent)) {
            throw new CollectorRequestEventContentException('user');
        }

        if (!('sample' in parsedContent)) {
            throw new CollectorRequestEventContentException('sample');
        }

        // @ts-ignore
        const sample = parsedContent.sample;

        // @ts-ignore
      if (!('target' in sample)) {
            throw new CollectorRequestEventContentException('sample.target');
        }

        if (!('before' in sample)) {
            throw new CollectorRequestEventContentException('sample.before');
        }

        if (!('after' in sample)) {
            throw new CollectorRequestEventContentException('sample.after');
        }

        return <ValidatedContentStructure>parsedContent;
    }
}
