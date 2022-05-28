export class MetricOperation {
    type:              number;
    operations?:        Operation[];
    compareOperations?: CompareOperation[];

    constructor(metricOperation: Partial<MetricOperation>) {
        if (!metricOperation) metricOperation = {};
        this.type = metricOperation.type;
        this.operations = Operation.fromArray(metricOperation.operations);
        this.compareOperations = CompareOperation.fromArray(metricOperation.compareOperations);
    }

    public static fromDTO(dto : any) : MetricOperation | null {
        return dto == null ? null : 
        new MetricOperation({
            type: dto.type,
            operations: Operation.fromDTOArray(dto.operations),
            compareOperations: CompareOperation.fromDTOArray(dto.compareOperations),
        });
    }

    public static fromDTOArray(dtoArray : any) : MetricOperation[] {
        return dtoArray.map((dto) => MetricOperation.fromDTO(dto));
    }
    public static fromArray(metricOperations: Partial<MetricOperation>[]): MetricOperation[] {
        return metricOperations.map((metricOperation) => new MetricOperation(metricOperation));
    }
}

export class Operation {
    id?:    string;
    label?: string;
    to?:    string;

    constructor(operation: Partial<Operation>) {
        if (!operation) operation = {};
        this.id = operation.id;
        this.label = operation.label;
        this.to = operation.to;
    }

    public static fromDTO(dto : any) : Operation | null {
        return dto == null ? null : 
        new Operation({
            id: dto.id,
            label: dto.label,
            to: dto.to,
        });
    }

    public static fromDTOArray(dtoArray : any) : Operation[] {
        return dtoArray.map((dto) => Operation.fromDTO(dto));
    }
    public static fromArray(operations: Partial<Operation>[]): Operation[] {
        return operations.map((operation) => new Operation(operation));
    }
}

export class CompareOperation {
    id?:    string;
    label?: string;
    to?:    string;

    constructor(compareOperations: Partial<CompareOperation>) {
        if (!compareOperations) compareOperations = {};
        this.id = compareOperations.id;
        this.label = compareOperations.label;
        this.to = compareOperations.to;
    }

    public static fromDTO(dto : any) : CompareOperation | null {
        return dto == null ? null : 
        new CompareOperation({
            id: dto.id,
            label: dto.label,
            to: dto.to,
        });
    }

    public static fromDTOArray(dtoArray : any) : CompareOperation[] {
        return dtoArray.map((dto) => CompareOperation.fromDTO(dto));
    }
    public static fromArray(compareOperations: Partial<CompareOperation>[]): CompareOperation[] {
        return compareOperations.map((compareOperation) => new CompareOperation(compareOperation));
    }
}