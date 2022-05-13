import { render, screen } from '@testing-library/react';
import Home from '@/pages';
import props from './home.props';
import '@testing-library/jest-dom';

describe('Home', () => {
  beforeEach(() => {
    render(<Home {...props} />);
  });

  it('should display filter text in search input', () => {
    const input = screen.getByPlaceholderText<HTMLInputElement>('Pesquisar...');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(props.filter);
  });

  it('should display users in table', () => {
    const table = screen.getByRole<HTMLTableElement>('table');
    expect(table).toBeInTheDocument();

    const { rows } = table.tBodies[0];
    expect(rows.length).toBe(props.users.length);

    props.users.forEach((user, index) => {
      const { cells } = rows[index];
      expect(cells[0]).toHaveTextContent(user.name);
      expect(cells[1]).toHaveTextContent(user.age.toString());
    });
  });

  it('should select the current page', () => {
    const pagination = screen.getByRole<HTMLUListElement>('list');
    expect(pagination).toBeInTheDocument();

    const selector = 'li a[aria-current="page"]';
    const page = pagination.querySelector<HTMLAnchorElement>(selector);
    expect(page?.text).toBe(props.page.toString());
  });
});
