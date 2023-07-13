
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
    other_images: []
    price: number
    reviews: [],
    categories: []|CategoryState[]
}

export interface Meta<> {
    next_disabled: boolean;
    prev_disabled: boolean;
}

export interface CategorySlugProps<> {
    category_slug?: string;
};