import { Injectable } from "@angular/core";
import { API } from "../api.service";
import { Category } from '../../model/category';

const ENDPOINTS = {
  getCategories: "categories",
  postCategory: "categories",
  putCategory: (id: number) => `categories/${id}`,
  deleteCategory: (id: number) => `categories/${id}`,
};

@Injectable()
export class CategoryGateway {
  constructor(private api: API) {}

  async getCategory(filter: any): Promise<GetCategoryDto> {
    const data = await this.api
      .get<any>(ENDPOINTS.getCategories, {}, null, null, filter)
      .toPromise();
    return {
      categories: Category.fromDTOArray(data.data.data),
      current_page: data.data.current_page,
      links: data.data.links,
      total: data.data.total,
      last_page: data.data.last_page,
      from: data.data.from,
    };
  }

  postCategory(cetegory: CategoryDto) {
    return this.api.post(
      ENDPOINTS.postCategory,
      {},
      {
        name: cetegory.name,
        description: cetegory.description,
      }
    );
  }

  updateCategory(cetegoryId: number, data: CategoryDto) {
    return this.api.put(
      ENDPOINTS.putCategory(cetegoryId),
      {},
      {
        name: data.name,
        description: data.description,
      }
    );
  }

  deleteCategory(cetegoryId: number) {
    return this.api.delete(ENDPOINTS.deleteCategory(cetegoryId), {});
  }
}

export interface CategoryDto {
  name: string;
  description: string;
}

export interface GetCategoryDto {
  categories: Category[];
  current_page: number;
  links: any[];
  total: number;
  last_page: number;
  from: number;
}
