# common-igrid
 Simple Grid library using Webcomponent

예제 링크: https://jjongtaeng.github.io/common-igrid

## Grid

### Row

- Method
  - `setContent(...rest: HTMLElement[])`
    ```javascript
    const $row = new Row();
    $row.setContent("Column Element");
    ```

### Column

- Method
  - `setContent(content: HTMLElement | string): this;`
  - `setSpan(span: SpanType): this;`
    ```javascript
    const column = new Column();
    const span = { xxl: '6', xl: '6', lg: '6', md: '12', sm: '12', xs: '24'};
    
    column
      .setContent(content)
      .setSpan(span);
    ```


- 총 24 사이즈
    - ex) `xxl: 4` 는 `1600px`에서 1/6 사이즈
- `xxl: > 1600px`
- `xl: > 1200px`
- `lg: > 992px`
- `md: > 768px`
- `sm: > 576px`
- `xs: < 576px`
