import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";
import { Movie } from "../models/interfaces/movie";
import { HeroType } from "../models/interfaces/hero";
import { Plan } from "../models/interfaces/plans";
import { MoviesConstant } from "../constants/movies/index";
import { HeroConstant } from "../constants/hero";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { AllPlansContant, PlansConstant } from "../constants/plans";
import PlanProvider from "../contexts/plans";
import PeriodProvider from "../contexts/period";

const movieListMock: Movie[] = MoviesConstant;
const heroMock: HeroType = HeroConstant;
const plansMock: Plan[] = PlansConstant;
const allPlansMock: Plan[] = AllPlansContant;

const server = setupServer(
  // Describe network behavior with request handlers.
  // Tip: move the handlers into their own module and
  // import it across your browser and Node.js setups!
  rest.get("/api/plans/2", (req, res, ctx) => {
    return res(ctx.json(plansMock));
  }),
  rest.get("/api/plans/full", (req, res, ctx) => {
    return res(ctx.json(allPlansMock));
  })
);

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  const HomeWithContext = (
    <PlanProvider>
      <PeriodProvider>
        <Home moviesList={movieListMock} hero={heroMock} />
      </PeriodProvider>
    </PlanProvider>
  );
  render(HomeWithContext);
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Home", () => {
  it("should renders  a description of plans", async () => {
    const contactElement = await screen.findByText(
      /disfruta solo en Smartphones y Tabletas/i
    );
    expect(contactElement).toBeInTheDocument();
  });
});

describe("Plans of home", () => {
  const clickOnPlanButton = async (
    times: number,
    buttonName: RegExp = /elige plan móvil/i
  ) => {
    const movilPlanButton = await screen.findByRole("button", {
      name: buttonName,
    });
    for (let i = 0; i < times; i++) {
      fireEvent.click(movilPlanButton);
    }
  };
  it(`if the user makes click on 'Elige plan movil' 3 times
  it should show an aditional plan called Premium `, async () => {
    clickOnPlanButton(3);
    expect(
      await screen.findByText(
        /te regalamos 100 mil dolares al mes, el negocio se va a quebrar/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /elige plan premium/i })
    ).toBeInTheDocument();
  });

  it(`If the user makes click more than 3 times 
  it should dissapear the premium plan`, async () => {
    clickOnPlanButton(4);
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /elige plan premium/i })
      ).not.toBeInTheDocument();
    });
  });

  it(`If the user makes click 2 times 
  it should not show the premium plan`, async () => {
    clickOnPlanButton(2);
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /elige plan premium/i })
      ).not.toBeInTheDocument();
    });
  });
});
