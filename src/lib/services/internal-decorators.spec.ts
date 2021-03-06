import { test } from 'ava';
import { Stuffd } from '../..';
import { Prop } from '../../decorators';
import { GuidType } from '../models/types';

import { getModelBuilder, getModelDef } from '../utils/meta-reader';

test(`@Prop() updates the design type`, t => {
  class TestClass {
    @Prop()
    thing: Date;
  }

  const propDef = getModelBuilder(TestClass)['_modelDefinition'].props.thing;
  t.is(propDef.designType, Date);
});

test(`@Prop() updates the associated model builder`, t => {
  class TestClass {
    @Prop(p => p.guid().optional())
    thing: string;
  }

  const propDef = getModelBuilder(TestClass)['_modelDefinition'].props.thing;
  t.is(propDef.type, GuidType);
  t.is(typeof propDef.optional, 'number');
});

test('@Prop() can be used multiple times on the same property', t => {
  class TestClass {
    @Prop(p => p.optional()) @Prop(p => p.guid())
    thing: string;
  }

  const propDef = getModelBuilder(TestClass)['_modelDefinition'].props.thing;
  t.is(propDef.type, GuidType);
  t.is(typeof propDef.optional, 'number');
})

test(`@Prop() uses the design type if no type has been specified`, t => {
  class ComplexThing {
    name: number;
    age: string;
    color: Date;
  }
  
  class TestClass1 {
    @Prop()
    thing: ComplexThing;
  }

  const propDef1 = getModelBuilder(TestClass1)['_modelDefinition'].props.thing;
  t.is(propDef1.designType, ComplexThing);
  t.is(typeof propDef1.type, 'undefined');

  class TestClass2 {
    @Prop(p => p.optional()) @Prop(p => p.type(String))
    thing: ComplexThing;
  }

  const propDef2 = getModelBuilder(TestClass2)['_modelDefinition'].props.thing;
  t.is(propDef2.designType, ComplexThing);
  t.is(propDef2.type, String);
});

test(`@Stuffd() builds the associated model definition`, t => {
  
  @Stuffd()
  class TestClass {
    @Prop(p => p.guid().optional())
    thing: string;
  }

  const propDef = getModelDef(TestClass).props.thing;
  t.is(propDef.type, GuidType);
  t.is(typeof propDef.optional, 'number');
});