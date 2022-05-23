import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Metric } from "../../model/metric";

const ENDPOINTS = {
  getMetric: "metrics",
  postMetric: "metrics",
  putMetric: (id: number) => `metrics/${id}`,
  deleteMetric: (id: number) => `metrics/${id}`,
};

@Injectable()
export class MetricGateway {
  constructor(private api: API) {}

  getMetrix(filter: any): Promise<Metric[]> {
    return this.api
      .get<any>(ENDPOINTS.getMetric, {}, null, null, filter)
      .toPromise()
      .then((data) => {
        return Metric.fromDTOArray(data.data.data);
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

  updateMetric(metricId: number, data: MetricDto) {
    return this.api.put(ENDPOINTS.putMetric(metricId), {}, { data });
  }

  deleteMetric(metricId : number) {
    return this.api.delete(ENDPOINTS.deleteMetric(metricId), {});
  }
}

export interface MetricDto {
  name: string;
  description?: string;
  type: number;
}
