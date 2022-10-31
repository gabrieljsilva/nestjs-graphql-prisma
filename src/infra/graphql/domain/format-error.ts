import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { BaseException } from '@exceptions';
import { EXCEPTION_CODES } from '@enums';
import { Exception } from '@interfaces';

export function formatError(error: Required<GraphQLError>) {
  const { originalError } = error;

  if (originalError instanceof BaseException) {
    const { message, code, keys } = originalError.getResponse() as Exception;
    const graphQLFormattedError: GraphQLFormattedError = {
      message: message || error.message,
      extensions: {
        code: code || EXCEPTION_CODES.INTERNAL_SERVER_ERROR,
        keys: keys,
      },
    };

    return graphQLFormattedError;
  }

  return {
    message: error.message,
    extensions: {
      code: EXCEPTION_CODES.INTERNAL_SERVER_ERROR,
    },
  };
}
