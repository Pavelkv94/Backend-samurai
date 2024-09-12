export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  NOT_FOUND_404: 404,
  BAD_REQUEST_400: 400,
};

type HttpStatusKeysType = keyof typeof HTTP_STATUSES;

export type HttpStatusType = (typeof HTTP_STATUSES)[HttpStatusKeysType]