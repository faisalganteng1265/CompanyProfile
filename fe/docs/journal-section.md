# Jurnal Tatsuo

Added between the Behind the Cut scroll stack and partnership section. Layout uses one large feature and two smaller editorial stories, serif headings, white grain, and image reveals that reset outside the viewport. Visual direction referenced [Kinfolk food stories](https://www.kinfolk.com/stories-categories/food/); all article copy is original sample content, not copied from the reference.

Three full reading routes live at `/artikel/[slug]`. Content and preview metadata are stored in `src/lib/articles.ts`. Detail pages visibly identify the copy as sample articles, use existing generated illustration photographs, and remain `noindex` pending client review. Unrecognized slugs return the existing 404 page. Existing Coming Soon routes remain unchanged.

No localhost, build, or browser checks were run for this change, following the user's code-only workflow.
