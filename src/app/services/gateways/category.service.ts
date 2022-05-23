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

  async getCategory(filter: any): Promise<Category[]> {
    const data = await this.api
          .get<any>(ENDPOINTS.getCategories, {}, null, null, filter)
          .toPromise();
      return Category.fromDTOArray(data.data.data);
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
    return this.api.put(ENDPOINTS.putCategory(cetegoryId), {}, {
        name: data.name,
        description: data.description
    });
  }

  deleteCategory(cetegoryId: number) {
    return this.api.delete(ENDPOINTS.deleteCategory(cetegoryId), {});
  }
}

export interface CategoryDto {
  name: string;
  description: string;
}
