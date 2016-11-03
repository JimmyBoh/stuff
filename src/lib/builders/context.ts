
import { Lookup, ILookup } from '../models/lookup';
import { Task } from '../builders/task';
import { ModelDefinition } from '../models/model-definition';
import { Model } from './model';

export type TaskDefinition = (t: Task) => void;

export class Context {

    private _modelCache: Lookup<Model>;
    private _taskCache: Lookup<TaskDefinition>;

    constructor() {
        this._modelCache = new Lookup<Model>();
    }

    public model(id: string): Model {

        if (this._modelCache.hasKey(id)) {
            throw new Error(`Model '${id}' has already been defined!'`);  
        }

        return this._modelCache.set(id, new Model(this._modelCache, { id }));
    }

    public task(taskName: string, task: TaskDefinition): string {
        this._taskCache.set(taskName, task);

        return taskName;
    }

    public run(taskName: string, output?: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let taskDef = this._taskCache.get(taskName);

            if (!taskDef) {
                return reject(new Error(`Unknown Task: '${taskName}'!`));
            }

            let task = new Task(taskName);
            taskDef(task);

            let orders = task.build();

            // TODO: Actually implement this thing...
        });
    }

    private _build(): ILookup<ModelDefinition> {
        let result: ILookup<ModelDefinition> = {};
        this._modelCache.forEach((mb, id) => {
            result[id] = mb.build();
        });

        return result;
    }
}