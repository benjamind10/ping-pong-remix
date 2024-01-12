var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 51,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 101,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links2
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
} from "@remix-run/react";

// app/components/MainNavigation.tsx
import { Link } from "@remix-run/react";

// app/components/MainNavigation.css
var MainNavigation_default = "/build/_assets/MainNavigation-ALWTDVZO.css";

// app/components/MainNavigation.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: MainNavigation_default }
], Header = () => /* @__PURE__ */ jsxDEV2("div", { className: "header-container", children: /* @__PURE__ */ jsxDEV2("header", { className: "header", children: /* @__PURE__ */ jsxDEV2("nav", { className: "navbar", children: [
  /* @__PURE__ */ jsxDEV2(Link, { to: "/", className: "nav-link", children: "Home" }, void 0, !1, {
    fileName: "app/components/MainNavigation.tsx",
    lineNumber: 15,
    columnNumber: 11
  }, this),
  /* @__PURE__ */ jsxDEV2(Link, { to: "/analytics", className: "nav-link", children: "Analytics" }, void 0, !1, {
    fileName: "app/components/MainNavigation.tsx",
    lineNumber: 18,
    columnNumber: 11
  }, this),
  /* @__PURE__ */ jsxDEV2(Link, { to: "/scores", className: "nav-link", children: "Score Cards" }, void 0, !1, {
    fileName: "app/components/MainNavigation.tsx",
    lineNumber: 21,
    columnNumber: 11
  }, this)
] }, void 0, !0, {
  fileName: "app/components/MainNavigation.tsx",
  lineNumber: 14,
  columnNumber: 9
}, this) }, void 0, !1, {
  fileName: "app/components/MainNavigation.tsx",
  lineNumber: 13,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/components/MainNavigation.tsx",
  lineNumber: 12,
  columnNumber: 5
}, this), MainNavigation_default2 = Header;

// app/styles/main.css
var main_default = "/build/_assets/main-LFRTZFAQ.css";

// app/root.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var links2 = () => [
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }] : [],
  { rel: "stylesheet", href: main_default }
];
function isDefinitelyAnError(error) {
  return typeof error == "object" && error !== null && "message" in error;
}
var ErrorBoundary = () => {
  let error = useRouteError();
  if (isRouteErrorResponse(error))
    return /* @__PURE__ */ jsxDEV3("div", { className: "error-container", children: [
      /* @__PURE__ */ jsxDEV3("h1", { children: "Uh oh ..." }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("p", { children: "Something went wrong." }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("pre", { children: error.data.message }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("a", { href: "/", className: "back-button", children: "Back to Home" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this);
  let errorMessage = "Unknown error";
  return isDefinitelyAnError(error) && (errorMessage = error.message), /* @__PURE__ */ jsxDEV3("div", { className: "error-container", children: [
    /* @__PURE__ */ jsxDEV3("h1", { children: "Uh oh ..." }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("p", { children: "Something went wrong." }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("pre", { children: errorMessage }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("a", { href: "/", className: "back-button", children: "Back to Home" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 49,
    columnNumber: 5
  }, this);
};
function App() {
  return /* @__PURE__ */ jsxDEV3("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { children: [
      /* @__PURE__ */ jsxDEV3("header", { children: /* @__PURE__ */ jsxDEV3(MainNavigation_default2, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 71,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 70,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 62,
    columnNumber: 5
  }, this);
}

// app/routes/analytics._index.tsx
var analytics_index_exports = {};
__export(analytics_index_exports, {
  default: () => Analytics,
  links: () => links4,
  meta: () => meta
});

// app/components/GameForm.tsx
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";

// app/components/GameForm.css
var GameForm_default = "/build/_assets/GameForm-O5NONEWB.css";

// app/components/GameForm.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var links3 = () => [
  { rel: "stylesheet", href: GameForm_default }
];
function GameForm() {
  let isSubmitting = useNavigation().state === "submitting", data = useActionData(), [gameId, setGameId] = useState(""), [player1, setPlayer1] = useState(""), [player2, setPlayer2] = useState(""), [score1, setScore1] = useState(0), [score2, setScore2] = useState(0), [winner, setWinner] = useState(""), [loser, setLoser] = useState(""), players = ["Goob", "Ben", "Ricky", "Spare"];
  useEffect(() => {
    setGameId(Math.floor(Math.random() * 1e4).toString()), setPlayer1(players[0]), setPlayer2(players[1]);
  }, []), useEffect(() => {
    if (player1 === player2) {
      let nextPlayer = players.find((p) => p !== player1);
      nextPlayer && setPlayer2(nextPlayer);
    }
  }, [player1, player2, players]), useEffect(() => {
    (score1 !== 0 || score2 !== 0) && (score1 > score2 ? (setWinner(player1), setLoser(player2)) : score2 > score1 ? (setWinner(player2), setLoser(player1)) : (setWinner(""), setLoser("")));
  }, [score1, score2, player1, player2]);
  let handlePlayerChange = (e, playerSetter) => {
    playerSetter(e.target.value);
  }, handleScoreChange = (e, scoreSetter) => {
    scoreSetter(Number(e.target.value));
  };
  return /* @__PURE__ */ jsxDEV4(Form, { method: "post", id: "pingpong-form", className: "formContainer", children: [
    data?.message && /* @__PURE__ */ jsxDEV4("p", { children: data.message }, void 0, !1, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 76,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("label", { htmlFor: "gameId", className: "label", children: "Game ID:" }, void 0, !1, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(
        "input",
        {
          type: "text",
          id: "gameId",
          name: "gameId",
          required: !0,
          className: "input",
          value: gameId,
          readOnly: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 82,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("label", { htmlFor: "gameType", className: "label", children: "Game Type:" }, void 0, !1, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("select", { id: "gameType", name: "gameType", required: !0, className: "select", children: [
        /* @__PURE__ */ jsxDEV4("option", { value: "11-point", children: "11-point" }, void 0, !1, {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 98,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV4("option", { value: "21-point", children: "21-point" }, void 0, !1, {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 99,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 93,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("label", { htmlFor: "player1", className: "label", children: "Player 1:" }, void 0, !1, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(
        "select",
        {
          id: "player1",
          name: "player1",
          required: !0,
          className: "select",
          value: player1,
          onChange: (e) => handlePlayerChange(e, setPlayer1),
          children: players.map(
            (player) => /* @__PURE__ */ jsxDEV4("option", { value: player, children: player }, player, !1, {
              fileName: "app/components/GameForm.tsx",
              lineNumber: 116,
              columnNumber: 11
            }, this)
          )
        },
        void 0,
        !1,
        {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 107,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("label", { htmlFor: "player2", className: "label", children: "Player 2:" }, void 0, !1, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 124,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(
        "select",
        {
          id: "player2",
          name: "player2",
          required: !0,
          className: "select",
          value: player2,
          onChange: (e) => handlePlayerChange(e, setPlayer2),
          children: players.filter((p) => p !== player1).map(
            (player) => /* @__PURE__ */ jsxDEV4("option", { value: player, children: player }, player, !1, {
              fileName: "app/components/GameForm.tsx",
              lineNumber: 138,
              columnNumber: 11
            }, this)
          )
        },
        void 0,
        !1,
        {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 127,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 123,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("label", { htmlFor: "score1", className: "label", children: "Player 1 Score:" }, void 0, !1, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(
        "input",
        {
          type: "number",
          id: "score1",
          name: "score1",
          required: !0,
          className: "input",
          value: score1,
          onChange: (e) => handleScoreChange(e, setScore1)
        },
        void 0,
        !1,
        {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 149,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 145,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("label", { htmlFor: "score2", className: "label", children: "Player 2 Score:" }, void 0, !1, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 161,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(
        "input",
        {
          type: "number",
          id: "score2",
          name: "score2",
          required: !0,
          className: "input",
          value: score2,
          onChange: (e) => handleScoreChange(e, setScore2)
        },
        void 0,
        !1,
        {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 164,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 160,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("label", { htmlFor: "winner", className: "label", children: "Winner:" }, void 0, !1, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 176,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(
        "input",
        {
          type: "text",
          id: "winner",
          name: "winner",
          required: !0,
          className: "input",
          value: winner,
          readOnly: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 179,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 175,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("label", { htmlFor: "loser", className: "label", children: "Loser:" }, void 0, !1, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 191,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4(
        "input",
        {
          type: "text",
          id: "loser",
          name: "loser",
          required: !0,
          className: "input",
          value: loser,
          readOnly: !0
        },
        void 0,
        !1,
        {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 194,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 190,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("div", { children: [
      /* @__PURE__ */ jsxDEV4("label", { htmlFor: "firstServe", className: "label", children: "First Serve:" }, void 0, !1, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 206,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV4("select", { id: "firstServe", name: "firstServe", required: !0, className: "select", children: [
        /* @__PURE__ */ jsxDEV4("option", { value: "Player1", children: "Player1" }, void 0, !1, {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 210,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV4("option", { value: "Player2", children: "Player2" }, void 0, !1, {
          fileName: "app/components/GameForm.tsx",
          lineNumber: 211,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/GameForm.tsx",
        lineNumber: 209,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 205,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV4("button", { type: "submit", className: "button", disabled: isSubmitting, children: isSubmitting ? "Submitting..." : "Submit Game" }, void 0, !1, {
      fileName: "app/components/GameForm.tsx",
      lineNumber: 215,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/GameForm.tsx",
    lineNumber: 75,
    columnNumber: 5
  }, this);
}

// app/routes/analytics._index.tsx
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Ping-Pong Analytics!" },
  { name: "description", content: "Lets play some Ping-Pong!" }
], links4 = () => [...links3(), ...links()];
function Analytics() {
  return /* @__PURE__ */ jsxDEV5("main", { children: /* @__PURE__ */ jsxDEV5("h1", { children: "Analytics Page" }, void 0, !1, {
    fileName: "app/routes/analytics._index.tsx",
    lineNumber: 19,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/analytics._index.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/routes/scores._index.tsx
var scores_index_exports = {};
__export(scores_index_exports, {
  default: () => Scores,
  links: () => links6,
  loader: () => loader,
  meta: () => meta2
});
import { useLoaderData } from "@remix-run/react";

// app/components/ScoreCard.css
var ScoreCard_default = "/build/_assets/ScoreCard-6AVYHCSR.css";

// app/components/ScoreCard.tsx
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var links5 = () => [{ rel: "stylesheet", href: ScoreCard_default }];
function ScoreCard({ scores }) {
  return /* @__PURE__ */ jsxDEV6("div", { id: "score-card-container", children: scores.map(
    (score, index) => /* @__PURE__ */ jsxDEV6("div", { className: "score-card", children: /* @__PURE__ */ jsxDEV6("article", { children: [
      /* @__PURE__ */ jsxDEV6("header", { children: /* @__PURE__ */ jsxDEV6("h2", { children: [
        "Game ID: ",
        score.gameId
      ] }, void 0, !0, {
        fileName: "app/components/ScoreCard.tsx",
        lineNumber: 24,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/ScoreCard.tsx",
        lineNumber: 23,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("p", { children: [
        score.player1,
        " vs ",
        score.player2
      ] }, void 0, !0, {
        fileName: "app/components/ScoreCard.tsx",
        lineNumber: 26,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("p", { children: [
        "Score: ",
        score.score1,
        " - ",
        score.score2
      ] }, void 0, !0, {
        fileName: "app/components/ScoreCard.tsx",
        lineNumber: 29,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("p", { children: [
        "Winner: ",
        score.winner
      ] }, void 0, !0, {
        fileName: "app/components/ScoreCard.tsx",
        lineNumber: 32,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("p", { children: [
        "Loser: ",
        score.loser
      ] }, void 0, !0, {
        fileName: "app/components/ScoreCard.tsx",
        lineNumber: 33,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("p", { children: [
        "First Serve:",
        " ",
        score.firstServe === "Player1" ? score.player1 : score.player2
      ] }, void 0, !0, {
        fileName: "app/components/ScoreCard.tsx",
        lineNumber: 34,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("p", { children: [
        "Date: ",
        score.dateTime
      ] }, void 0, !0, {
        fileName: "app/components/ScoreCard.tsx",
        lineNumber: 38,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/ScoreCard.tsx",
      lineNumber: 22,
      columnNumber: 11
    }, this) }, score.gameId, !1, {
      fileName: "app/components/ScoreCard.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this)
  ) }, void 0, !1, {
    fileName: "app/components/ScoreCard.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}
var ScoreCard_default2 = ScoreCard;

// app/data/scores.js
import fs from "fs/promises";
async function getStoredScores() {
  let rawFileContent = await fs.readFile("scores.json", {
    encoding: "utf-8"
  });
  return JSON.parse(rawFileContent).scores ?? [];
}
function storeScores(scores) {
  return fs.writeFile("scores.json", JSON.stringify({ scores: scores || [] }));
}

// app/routes/scores._index.tsx
import { Fragment, jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var meta2 = () => [
  { title: "Ping-Pong Table!" },
  { name: "description", content: "Lets play some Ping-Pong!" }
], links6 = () => [...links3(), ...links(), ...links5()], loader = async () => {
  try {
    return await getStoredScores() || [];
  } catch (error) {
    return console.error(error), [];
  }
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function Scores() {
  let scores = useLoaderData();
  return /* @__PURE__ */ jsxDEV7(Fragment, { children: [
    /* @__PURE__ */ jsxDEV7("h1", { children: [
      "Total Games: ",
      scores.length
    ] }, void 0, !0, {
      fileName: "app/routes/scores._index.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { className: "score-card-container", children: scores.map((score, index) => /* @__PURE__ */ jsxDEV7("div", { className: "score-card", children: /* @__PURE__ */ jsxDEV7(ScoreCard_default2, { scores: [score] }, void 0, !1, {
      fileName: "app/routes/scores._index.tsx",
      lineNumber: 48,
      columnNumber: 13
    }, this) }, score.gameId, !1, {
      fileName: "app/routes/scores._index.tsx",
      lineNumber: 47,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/routes/scores._index.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("button", { onClick: scrollToTop, className: "scroll-to-top", children: "\u2191 Top" }, void 0, !1, {
      fileName: "app/routes/scores._index.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/scores._index.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  action: () => action,
  default: () => Index,
  links: () => links7,
  meta: () => meta3
});
import {
  redirect
} from "@remix-run/node";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var meta3 = () => [
  { title: "Ping-Pong Tracker!" },
  { name: "description", content: "Lets play some Ping-Pong!" }
], links7 = () => [...links3(), ...links()], action = async ({ request }) => {
  let formData = await request.formData(), scoreData = {
    gameId: formData.get("gameId"),
    gameType: formData.get("gameType"),
    player1: formData.get("player1"),
    player2: formData.get("player2"),
    score1: Number(formData.get("score1")),
    score2: Number(formData.get("score2")),
    winner: formData.get("winner"),
    loser: formData.get("loser"),
    firstServe: formData.get("firstServe"),
    dateTime: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (isNaN(scoreData.score1) || isNaN(scoreData.score2))
    return new Response(
      JSON.stringify({
        message: "Invalid scores - scores must be numbers."
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  let updatedScores = (await getStoredScores()).concat(scoreData);
  return await storeScores(updatedScores), redirect("/scores");
};
function Index() {
  return /* @__PURE__ */ jsxDEV8("main", { children: [
    /* @__PURE__ */ jsxDEV8("h1", { children: "Enter Data:" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV8(GameForm, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 63,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-IICNBJQ6.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-UXE6ZORE.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-AKQYA37I.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-Y5XFHBLC.js", imports: ["/build/_shared/chunk-5R45QZWT.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-OGLFCSUX.js", imports: ["/build/_shared/chunk-S7MJJ4WG.js"], hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/analytics._index": { id: "routes/analytics._index", parentId: "root", path: "analytics", index: !0, caseSensitive: void 0, module: "/build/routes/analytics._index-QU6QFFUH.js", imports: ["/build/_shared/chunk-S7MJJ4WG.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/scores._index": { id: "routes/scores._index", parentId: "root", path: "scores", index: !0, caseSensitive: void 0, module: "/build/routes/scores._index-LS6EBATD.js", imports: ["/build/_shared/chunk-S7MJJ4WG.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "64aea906", hmr: { runtime: "/build/_shared\\chunk-AKQYA37I.js", timestamp: 1705095806267 }, url: "/build/manifest-64AEA906.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/analytics._index": {
    id: "routes/analytics._index",
    parentId: "root",
    path: "analytics",
    index: !0,
    caseSensitive: void 0,
    module: analytics_index_exports
  },
  "routes/scores._index": {
    id: "routes/scores._index",
    parentId: "root",
    path: "scores",
    index: !0,
    caseSensitive: void 0,
    module: scores_index_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
