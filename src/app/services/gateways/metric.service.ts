import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Metric } from "../../model/metric";
import { MetricOperation } from "../../model/metric-operation";
import {Event} from '../../model/event';

const ENDPOINTS = {
  getMetric: "metrics",
  postMetric: "metrics",
  metricConfiguration: "metricConfiguration",
  eventMetrics: (id: number) => `metric/get-event-metrics/${id}`,
  putMetric: (id: number) => `metrics/${id}`,
  deleteMetric: (id: number) => `metrics/${id}`,
  getMetricOperation: "getMetricsOperations",
  getUserEventMetrics: 'metric/metrics-event-user'
};

@Injectable()
export class MetricGateway {
  constructor(private api: API) {}

  getMetrix(filter: any): Promise<GetMetricstDto> {
    return this.api
      .get<any>(ENDPOINTS.getMetric, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return {
          metrics: Metric.fromDTOArray(data.data.data),
          current_page: data.data.current_page,
          links: data.data.links,
          total: data.data.total,
          last_page: data.data.last_page,
          from: data.data.from,
        };
      });
  }

  getEventMetrics(eventId: number) {
    return this.api.get<any>(
      ENDPOINTS.eventMetrics(eventId),
      {},
      null,
      null,
      {}
    );
  }

  getMetricsOperation(filter: any): Promise<MetricOperation[]> {
    return this.api
      .get<any>(ENDPOINTS.getMetricOperation, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return MetricOperation.fromDTOArray(data);
      });
  }

  postMetric(metric: MetricDto) {
    return this.api.post(
      ENDPOINTS.postMetric,
      {},
      {
        name: metric.name,
        description: metric.description,
        type: metric.type,
      }
    );
  }

  postMetricConfiguration(metricConfiguration: metricConfiguration) {
    return this.api.post(
      ENDPOINTS.metricConfiguration,
      {},
      {
        max_value: metricConfiguration.maxValue,
        min_value: metricConfiguration.minValue,
        values_limit: metricConfiguration.valuesLimit,
        at_event_end: metricConfiguration.atEndValue,
        metric_id: metricConfiguration.metricId,
        event_id: metricConfiguration.eventId,
      }
    );
  }

  updateMetric(metricId: number, data: MetricDto) {
    return this.api.put(
      ENDPOINTS.putMetric(metricId),
      {},
      {
        name: data.name,
        type: data.type,
        description: data.description,
      }
    );
  }

  deleteMetric(metricId: number) {
    return this.api.delete(ENDPOINTS.deleteMetric(metricId), {});
  }

  async getUserEventMetrics(eventId: number, userId: number) {
    return this.api
      .get(
        ENDPOINTS.getUserEventMetrics,
        {},
        {
          user_id: userId,
          event_id: eventId,
        }
      )
      .toPromise()
      .then((data: any) => {
        return data.data;
      });
  }
}

export interface MetricDto {
  name: string;
  description?: string;
  type: number;
}

export interface GetMetricstDto {
  metrics: Metric[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}

export interface metricConfiguration {
  maxValue?: number;
  minValue?: number;
  valuesLimit?: number;
  atEndValue?: number;
  metricId: number;
  eventId: number
}
