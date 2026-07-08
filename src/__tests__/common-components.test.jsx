import { render, screen } from '@testing-library/react';
import UserAvatar from '../components/common/UserAvatar';
import MermaidRenderer from '../components/common/MermaidRenderer';
import Toggle from '../components/common/Toggle';
import StatPill from '../components/common/StatPill';

describe('Common Components', () => {
  describe('UserAvatar', () => {
    it('renders with default props', () => {
      render(<UserAvatar />);
      const avatar = screen.getByRole('button');
      expect(avatar).toBeInTheDocument();
    });

    it('renders with custom name', () => {
      render(<UserAvatar name="Test User" />);
      const avatar = screen.getByRole('button');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('MermaidRenderer', () => {
    it('renders container with code', () => {
      const { container } = render(<MermaidRenderer code="graph TD; A-->B;" />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
      expect(div).toHaveClass('flex');
    });

    it('renders container when code is empty', () => {
      const { container } = render(<MermaidRenderer code="" />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });
  });

  describe('Toggle', () => {
    it('renders toggle component', () => {
      render(<Toggle checked={true} onChange={() => {}} />);
      const toggle = screen.getByRole('button');
      expect(toggle).toBeInTheDocument();
    });

    it('applies checked style when checked', () => {
      render(<Toggle checked={true} onChange={() => {}} />);
      const toggle = screen.getByRole('button');
      const knob = toggle.querySelector('div');
      expect(knob).toHaveClass('left-[18px]');
    });

    it('applies unchecked style when unchecked', () => {
      render(<Toggle checked={false} onChange={() => {}} />);
      const toggle = screen.getByRole('button');
      const knob = toggle.querySelector('div');
      expect(knob).toHaveClass('left-0.5');
    });
  });

  describe('StatPill', () => {
    it('renders stat pill with label and value', () => {
      render(<StatPill label="Test" value="100" />);
      const label = screen.getByText('Test');
      const value = screen.getByText('100');
      expect(label).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });

    it('renders with custom icon', () => {
      render(<StatPill label="Test" value="100" icon={<span data-testid="test-icon">📊</span>} />);
      const icon = screen.getByTestId('test-icon');
      expect(icon).toBeInTheDocument();
    });
  });
});
