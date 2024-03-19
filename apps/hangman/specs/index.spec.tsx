import React, { ReactElement } from 'react';
import {
  render,
  fireEvent,
  screen,
  RenderOptions,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import testData from './testData.json';
import Page from '../app/page';
import Game from '../app/components/game';
import HangmanContextProvider from '../app/context/hangman-context';
import CurrentGameBanner from '../app/components/current-game-banner/current-game-banner';
import GameBoard from '../app/components/game-board/game-board';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <HangmanContextProvider data={testData}>{children}</HangmanContextProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// TODO - when clean up move to new file
// export * from '@testing-library/react';
// export { customRender as render };

describe('Page', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(await Page());
    expect(baseElement).toBeTruthy();
  });
});

describe('Game', () => {
  it('should render successfully', async () => {
    const { baseElement } = customRender(<Game data={testData} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully', async () => {
    const { baseElement } = customRender(<Game data={testData} />);
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully', async () => {
    const { baseElement } = customRender(<Game data={testData} />);
    expect(baseElement).toBeTruthy();
  });

  it('Keyboard: key should be disabled when clicked )', async () => {
    customRender(<Game data={testData} />);

    const button = screen.getAllByRole('tab');
    fireEvent.click(button[0]);

    const buttonQ = screen.getByRole('button', { name: 'q' });

    expect(buttonQ).not.toBeDisabled;
    fireEvent.click(buttonQ);

    expect(buttonQ).toBeDisabled;
  });
  it('Keyboard: key should be disabled when keydown option chosen )', async () => {
    customRender(<Game data={testData} />);

    const gameWrapper = screen.getByTestId('game-wrapper');
    const button = screen.getAllByRole('tab');
    fireEvent.click(button[0]);

    const buttonQ = screen.getByRole('button', { name: 'q' });
    expect(buttonQ).not.toBeDisabled;

    fireEvent.keyDown(gameWrapper, { key: 'q', code: 'KeyQ' });

    fireEvent.click(buttonQ);
    expect(buttonQ).toBeDisabled;
  });

  // TODO should update ui when letter guessed
  // start game message no longer on screen
  // restart button
  // life lost or letter added
  // it('should have heart decrease when wrong letter', async () => {});
  // it('should have skulls when LOST game', async () => {});
  // it('should have letter badge red boarder when LOST game', async () => {});
  // it('should have streak + letter badge green boarder + celebration when WON game', async () => {});
  // it('should have new game button when game won', async () => {});
  // it('should have restart button when in middle of game', async () => {});
});

describe('CurrentGameBanner', () => {
  it('should render successfully', async () => {
    const { baseElement } = customRender(<CurrentGameBanner />);
    expect(baseElement).toBeTruthy();
  });
});

describe('GameBoard', () => {
  it('it should have clickable tabs', async () => {
    customRender(<GameBoard />);

    const button = screen.getAllByRole('tab');
    expect(button[0]).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(button[0]);
    expect(button[0]).toHaveAttribute('aria-selected', 'true');
  });
  it('tabpanel should not be showing initially', async () => {
    customRender(<GameBoard />);

    const initialTabPanel = screen.queryByRole('tabpanel');

    expect(initialTabPanel).not.toBeInTheDocument();
  });
  it('tabpanel should show when a category is selected', async () => {
    customRender(<GameBoard />);

    const initialTabPanel = screen.queryByRole('tabpanel');

    expect(initialTabPanel).not.toBeInTheDocument();

    const button = screen.getAllByRole('tab');
    fireEvent.click(button[0]);
    expect(button[0]).toHaveAttribute('aria-selected', 'true');

    const tabPanel = screen.queryByRole('tabpanel');

    expect(tabPanel).toBeInTheDocument();
  });
  it('tabpanel should contain a collection of letter badges', async () => {
    customRender(<GameBoard />);

    const button = screen.getAllByRole('tab');
    fireEvent.click(button[0]);

    const letterBadge = screen.getAllByTestId('letter-badge');
    expect(letterBadge).toBeTruthy();
  });

  // TODO: styles red, green, grey
  // expect(letterBadge[0]).toHaveStyle({ borderWidth: '2px' });
});
