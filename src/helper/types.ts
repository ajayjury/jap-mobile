import { ReactNode } from "react";

export interface CategoryState<> {
    id: number;
    name: string;
    slug: string;
    description?: string;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
    banner_image_link?: string;
    icon_image_link?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

export interface ProductReviewState<> {
    created_at: string;
    email: string;
    id: number;
    image_link?: string;
    is_approved: boolean;
    message?: string;
    name?: string;
    star: number;
    updated_at: string;
}
export interface ProductOtherImagesState<> {
    id: number;
    image_link?: string;
    created_at: string;
    updated_at: string;
    image_alt?: string;
    image_title?: string;
}
export interface ProductSegmentState<> {
    id: number;
    name: string;
    slug: string;
    description?: string;
    meta_title?: string;
    meta_keywords?: string;
    meta_description?: string;
    featured_image_link?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    discount: number;
    discounted_price: number;
    image_alt?: string;
    image_title?: string;
    in_stock: boolean;
    inventory: number;
    is_best_sale: boolean;
    is_featured: boolean;
    is_new_arrival: boolean
    other_images: ProductOtherImagesState[]|[]
    price: number
    reviews: ProductReviewState[]|[],
    categories: []|CategoryState[]
}

export interface Meta<> {
    next_disabled: boolean;
    prev_disabled: boolean;
}

export interface CategorySlugProps<> {
    category_slug?: string;
};

export interface BannerImages<> {
    images: string[]|[]
}

export interface ChildrenType<> {
    children: ReactNode
}

export interface RoleType<> {
    id: number;
    name: string;
    permissions: string[];
    created_at: string;
    updated_at: string;
}

export interface UserType<> {
    id: number;
    email: string;
    name: string;
    phone: string;
    verified: string;
    roles: RoleType[];
}

export interface AuthType<> {
    authenticated: boolean;
    token: string;
    token_type: string;
    user?: UserType;
}