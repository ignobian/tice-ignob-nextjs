import { CategoryBtn } from '../Button';
import Link from 'next/link';

const CategoryListSection = ({ categories }) => {

  const listCategories = () => (
    categories && categories.map((c, i) => (
      <div className="py-3 mx-2">
        <Link key={i} href={`/categories/${c.slug}`}>
          <CategoryBtn># {c.name}</CategoryBtn>
        </Link>
      </div>
    ))
  )

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center">
      {listCategories()}
    </div>
  )
}

export default CategoryListSection;