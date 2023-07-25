export enum QuerySortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ClassTransformerGroups {
  /** Expose properties only for the currently authenticated user. */
  GROUP_ME = 'user:me',
}

export enum UserStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  INGAME = 'INGAME',
}
