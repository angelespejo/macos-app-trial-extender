import type {  Members } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any
export type MemberID = keyof Members
export type MembersWithId = Members[keyof Members] & { id: MemberID }
