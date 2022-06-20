export enum METRIC_TYPES {
  BOOLEAN = 1,
  LIST_BOOLEAN = 2,
  STRING = 3,
  LIST_STRING = 4,
  NUMBER = 5,
  LIST_NUMBER = 6,
  ENUM = 7,
  LIST_ENUM = 8,
}

export class Metric {
  id: number;
  name: string;
  description: string;
  metric_enum?: MetricEnum[];
  type: METRIC_TYPES;
  created_at: Date;

  constructor(metric: Partial<Metric>) {
    if (!metric) metric = {};
    this.id = metric.id;
    this.name = metric.name;
    this.description = metric.description;
    this.type = metric.type;
    this.created_at = new Date(metric.created_at);
    this.metric_enum = MetricEnum.fromArray(metric.metric_enum);
  }

  public static fromDTO(dto: any): Metric | null {
    return dto == null
      ? null
      : new Metric({
          id: dto.id,
          name: dto.name,
          description: dto.description,
          type:
            dto.type == 1
              ? METRIC_TYPES.BOOLEAN
              : dto.type == 2
              ? METRIC_TYPES.LIST_BOOLEAN
              : dto.type == 3
              ? METRIC_TYPES.STRING
              : dto.type == 4
              ? METRIC_TYPES.LIST_STRING
              : dto.type == 5
              ? METRIC_TYPES.NUMBER
              : dto.type == 6
              ? METRIC_TYPES.LIST_NUMBER
              : dto.type == 7
              ? METRIC_TYPES.ENUM
              : dto.type == 8
              ? METRIC_TYPES.LIST_ENUM
              : METRIC_TYPES.BOOLEAN,
          created_at: dto.created_at,
          metric_enum:
            dto.metric_enum == null
              ? []
              : MetricEnum.fromDTOArray(dto.metric_enum),
        });
  }

  public static fromDTOArray(dtoArray: any): Metric[] {
    return dtoArray.map((dto) => Metric.fromDTO(dto));
  }
  public static fromArray(metrix: Partial<Metric>[]): Metric[] {
    return metrix.map((metric) => new Metric(metric));
  }
}

export class MetricEnum {
  created_at: Date;
  enum_value: string;
  id: number;
  metric_id: number;

  constructor(metricEnum: Partial<MetricEnum>) {
    if (!metricEnum) metricEnum = {};
    this.id = metricEnum.id;
    this.enum_value = metricEnum.enum_value;
    this.metric_id = metricEnum.metric_id;
    this.created_at = new Date(metricEnum.created_at);
  }

  public static fromDTO(dto: any): MetricEnum | null {
    return dto == null
      ? null
      : new MetricEnum({
          id: dto.id,
          enum_value: dto.enum_value,
          metric_id: dto.metric_id,
          created_at: dto.created_at,
        });
  }

  public static fromDTOArray(dtoArray: any): MetricEnum[] {
    return dtoArray.map((dto) => MetricEnum.fromDTO(dto));
  }
  public static fromArray(metricEnums: Partial<MetricEnum>[]): MetricEnum[] {
    return metricEnums.map((metricEnum) => new MetricEnum(metricEnum));
  }
}
