import {
  Field,
  UInt64,
  UInt32,
  Bool,
  Character,
  CircuitString,
} from 'snarkyjs';

/**
 * @category model
 * @since 2.0.0
 */
export interface SnarkyEq<A> {
  readonly equals: (x: A, y: A) => Bool;
}

export type SnarkyEqTypes =
  | Field
  | UInt32
  | UInt64
  | Bool
  | Character
  | CircuitString;

//export const getSnarkyEq = <SnarkyEqTypes>(): SnarkyEq<A> => ({
//  equals: (x, y) => x.equals(y),
//});

//export interface SnarkyEq<A> {
//  readonly equals: (x: A, y: A) => Bool;
//}
//
//export type SnarkyEqTypes = Field &
//  UInt32 &
//  UInt64 &
//  Bool &
//  Character &
//  CircuitString;
//
//export const getSnarkyEq = <A extends <Field | UInt32 | UInt64 | Bool | Character | CircuitString>>(): SnarkyEq<A> => ({
//  equals: (x, y) => x.equals(y),
//});
