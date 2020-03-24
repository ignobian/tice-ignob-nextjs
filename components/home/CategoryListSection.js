import { CategoryBtn } from '../Button';
import Link from 'next/link';

const CategoryListSection = ({ categories }) => {

  const listCategories = () => (
    categories && categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <CategoryBtn># {c.name}</CategoryBtn>
      </Link>
    ))
  )

  return (
    <div>
      {listCategories()}
    </div>
  )
}

export default CategoryListSection;