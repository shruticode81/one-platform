import {
  Document, Model, model, Schema,
} from 'mongoose';

export const NamespaceSchema: Schema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['REST', 'GRAPHQL'],
  },
  tags: [String],
  owners: [
    {
      mid: {
        type: String,
      },
      group: {
        type: String,
        enum: ['MAILING_LIST', 'USER'],
      },
    },
  ],
  appUrl: {
    type: String,
  },
  schemaEndpoint: {
    type: String,
  },
  lastCheckedOn: {
    type: Date,
    default: Date.now,
  },
  hash: {
    type: String,
  },
  subscribers: [
    {
      email: {
        type: String,
      },
      group: {
        type: String,
        enum: ['MAILING_LIST', 'USER'],
      },
    },
  ],
  headers: [
    {
      key: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  environments: [
    {
      name: {
        type: String,
      },
      apiBasePath: {
        type: String,
      },
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
  },
});

export interface NamespaceModel extends NamespaceDoc, Document { }

type NamespaceModelStatic = Model<NamespaceModel>;

export const Namespace: Model<NamespaceModel> = model<NamespaceModel, NamespaceModelStatic>('Namespace', NamespaceSchema);
