create table "public"."product_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "idx" smallint
);


create table "public"."products" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "package_weight_kg" numeric not null,
    "package_price" numeric not null,
    "url" text,
    "shelf_life_days" smallint,
    "storage_temperature" smallint,
    "supplier_id" uuid not null,
    "category_id" uuid not null
);


create table "public"."recipe_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "idx" smallint
);


create table "public"."recipe_products" (
    "recipe_id" uuid not null,
    "product_id" uuid not null,
    "quantity" numeric
);


create table "public"."recipes" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "category_id" uuid not null
);


create table "public"."suppliers" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
);


CREATE UNIQUE INDEX product_categories_name_key ON public.product_categories USING btree (name);

CREATE UNIQUE INDEX product_categories_pkey ON public.product_categories USING btree (id);

CREATE UNIQUE INDEX products_name_key ON public.products USING btree (name);

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);

CREATE UNIQUE INDEX recipe_categories_name_key ON public.recipe_categories USING btree (name);

CREATE UNIQUE INDEX recipe_categories_pkey ON public.recipe_categories USING btree (id);

CREATE UNIQUE INDEX recipe_products_pkey ON public.recipe_products USING btree (recipe_id, product_id);

CREATE UNIQUE INDEX recipes_name_key ON public.recipes USING btree (name);

CREATE UNIQUE INDEX recipes_pkey ON public.recipes USING btree (id);

CREATE UNIQUE INDEX suppliers_name_key ON public.suppliers USING btree (name);

CREATE UNIQUE INDEX suppliers_pkey ON public.suppliers USING btree (id);

alter table "public"."product_categories" add constraint "product_categories_pkey" PRIMARY KEY using index "product_categories_pkey";

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."recipe_categories" add constraint "recipe_categories_pkey" PRIMARY KEY using index "recipe_categories_pkey";

alter table "public"."recipe_products" add constraint "recipe_products_pkey" PRIMARY KEY using index "recipe_products_pkey";

alter table "public"."recipes" add constraint "recipes_pkey" PRIMARY KEY using index "recipes_pkey";

alter table "public"."suppliers" add constraint "suppliers_pkey" PRIMARY KEY using index "suppliers_pkey";

alter table "public"."product_categories" add constraint "product_categories_name_key" UNIQUE using index "product_categories_name_key";

alter table "public"."products" add constraint "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES product_categories(id) ON UPDATE CASCADE not valid;

alter table "public"."products" validate constraint "products_category_id_fkey";

alter table "public"."products" add constraint "products_name_key" UNIQUE using index "products_name_key";

alter table "public"."products" add constraint "products_supplier_id_fkey" FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON UPDATE CASCADE not valid;

alter table "public"."products" validate constraint "products_supplier_id_fkey";

alter table "public"."recipe_categories" add constraint "recipe_categories_name_key" UNIQUE using index "recipe_categories_name_key";

alter table "public"."recipe_products" add constraint "recipe_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) not valid;

alter table "public"."recipe_products" validate constraint "recipe_products_product_id_fkey";

alter table "public"."recipe_products" add constraint "recipe_products_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(id) not valid;

alter table "public"."recipe_products" validate constraint "recipe_products_recipe_id_fkey";

alter table "public"."recipes" add constraint "recipes_category_id_fkey" FOREIGN KEY (category_id) REFERENCES recipe_categories(id) ON UPDATE CASCADE not valid;

alter table "public"."recipes" validate constraint "recipes_category_id_fkey";

alter table "public"."recipes" add constraint "recipes_name_key" UNIQUE using index "recipes_name_key";

alter table "public"."suppliers" add constraint "suppliers_name_key" UNIQUE using index "suppliers_name_key";

grant delete on table "public"."product_categories" to "anon";

grant insert on table "public"."product_categories" to "anon";

grant references on table "public"."product_categories" to "anon";

grant select on table "public"."product_categories" to "anon";

grant trigger on table "public"."product_categories" to "anon";

grant truncate on table "public"."product_categories" to "anon";

grant update on table "public"."product_categories" to "anon";

grant delete on table "public"."product_categories" to "authenticated";

grant insert on table "public"."product_categories" to "authenticated";

grant references on table "public"."product_categories" to "authenticated";

grant select on table "public"."product_categories" to "authenticated";

grant trigger on table "public"."product_categories" to "authenticated";

grant truncate on table "public"."product_categories" to "authenticated";

grant update on table "public"."product_categories" to "authenticated";

grant delete on table "public"."product_categories" to "service_role";

grant insert on table "public"."product_categories" to "service_role";

grant references on table "public"."product_categories" to "service_role";

grant select on table "public"."product_categories" to "service_role";

grant trigger on table "public"."product_categories" to "service_role";

grant truncate on table "public"."product_categories" to "service_role";

grant update on table "public"."product_categories" to "service_role";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";

grant delete on table "public"."recipe_categories" to "anon";

grant insert on table "public"."recipe_categories" to "anon";

grant references on table "public"."recipe_categories" to "anon";

grant select on table "public"."recipe_categories" to "anon";

grant trigger on table "public"."recipe_categories" to "anon";

grant truncate on table "public"."recipe_categories" to "anon";

grant update on table "public"."recipe_categories" to "anon";

grant delete on table "public"."recipe_categories" to "authenticated";

grant insert on table "public"."recipe_categories" to "authenticated";

grant references on table "public"."recipe_categories" to "authenticated";

grant select on table "public"."recipe_categories" to "authenticated";

grant trigger on table "public"."recipe_categories" to "authenticated";

grant truncate on table "public"."recipe_categories" to "authenticated";

grant update on table "public"."recipe_categories" to "authenticated";

grant delete on table "public"."recipe_categories" to "service_role";

grant insert on table "public"."recipe_categories" to "service_role";

grant references on table "public"."recipe_categories" to "service_role";

grant select on table "public"."recipe_categories" to "service_role";

grant trigger on table "public"."recipe_categories" to "service_role";

grant truncate on table "public"."recipe_categories" to "service_role";

grant update on table "public"."recipe_categories" to "service_role";

grant delete on table "public"."recipe_products" to "anon";

grant insert on table "public"."recipe_products" to "anon";

grant references on table "public"."recipe_products" to "anon";

grant select on table "public"."recipe_products" to "anon";

grant trigger on table "public"."recipe_products" to "anon";

grant truncate on table "public"."recipe_products" to "anon";

grant update on table "public"."recipe_products" to "anon";

grant delete on table "public"."recipe_products" to "authenticated";

grant insert on table "public"."recipe_products" to "authenticated";

grant references on table "public"."recipe_products" to "authenticated";

grant select on table "public"."recipe_products" to "authenticated";

grant trigger on table "public"."recipe_products" to "authenticated";

grant truncate on table "public"."recipe_products" to "authenticated";

grant update on table "public"."recipe_products" to "authenticated";

grant delete on table "public"."recipe_products" to "service_role";

grant insert on table "public"."recipe_products" to "service_role";

grant references on table "public"."recipe_products" to "service_role";

grant select on table "public"."recipe_products" to "service_role";

grant trigger on table "public"."recipe_products" to "service_role";

grant truncate on table "public"."recipe_products" to "service_role";

grant update on table "public"."recipe_products" to "service_role";

grant delete on table "public"."recipes" to "anon";

grant insert on table "public"."recipes" to "anon";

grant references on table "public"."recipes" to "anon";

grant select on table "public"."recipes" to "anon";

grant trigger on table "public"."recipes" to "anon";

grant truncate on table "public"."recipes" to "anon";

grant update on table "public"."recipes" to "anon";

grant delete on table "public"."recipes" to "authenticated";

grant insert on table "public"."recipes" to "authenticated";

grant references on table "public"."recipes" to "authenticated";

grant select on table "public"."recipes" to "authenticated";

grant trigger on table "public"."recipes" to "authenticated";

grant truncate on table "public"."recipes" to "authenticated";

grant update on table "public"."recipes" to "authenticated";

grant delete on table "public"."recipes" to "service_role";

grant insert on table "public"."recipes" to "service_role";

grant references on table "public"."recipes" to "service_role";

grant select on table "public"."recipes" to "service_role";

grant trigger on table "public"."recipes" to "service_role";

grant truncate on table "public"."recipes" to "service_role";

grant update on table "public"."recipes" to "service_role";

grant delete on table "public"."suppliers" to "anon";

grant insert on table "public"."suppliers" to "anon";

grant references on table "public"."suppliers" to "anon";

grant select on table "public"."suppliers" to "anon";

grant trigger on table "public"."suppliers" to "anon";

grant truncate on table "public"."suppliers" to "anon";

grant update on table "public"."suppliers" to "anon";

grant delete on table "public"."suppliers" to "authenticated";

grant insert on table "public"."suppliers" to "authenticated";

grant references on table "public"."suppliers" to "authenticated";

grant select on table "public"."suppliers" to "authenticated";

grant trigger on table "public"."suppliers" to "authenticated";

grant truncate on table "public"."suppliers" to "authenticated";

grant update on table "public"."suppliers" to "authenticated";

grant delete on table "public"."suppliers" to "service_role";

grant insert on table "public"."suppliers" to "service_role";

grant references on table "public"."suppliers" to "service_role";

grant select on table "public"."suppliers" to "service_role";

grant trigger on table "public"."suppliers" to "service_role";

grant truncate on table "public"."suppliers" to "service_role";

grant update on table "public"."suppliers" to "service_role";


