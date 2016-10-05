
import { AggregateDefinition, LazyArray } from './types';

/**
 * Set of properties which are used to define model properties.
 * 
 * @export
 * @interface PropertyDefinition
 */
export interface PropertyDefinition {
  
  /**
   * The property identifier, usually the type name.
   * 
   * @type {string}
   * @memberOf PropertyDefinition
   */
  id?: string;

  /**
   * The full name of the property, usually used as the column name.
   * 
   * @type {string}
   * @memberOf PropertyDefinition
   */
  name?: string;
  
  /**
   * Is this property a primary key?
   * 
   * @type {boolean}
   * @memberOf PropertyDefinition
   */
  key?: boolean;

  /**
   * The minimum indicator, for numbers, dates, string lengths, etc.
   * 
   * @type {number}
   * @memberOf PropertyDefinition
   */
  min?: number | Date;
  max?: number | Date;
  length?: number;
  optional?: number;
  unique?: boolean;
  type?: any;
  secondaryType?: any;
  decimals?: number,
  sum?: AggregateDefinition<any, any, number>;
  choices?: LazyArray<any>
}