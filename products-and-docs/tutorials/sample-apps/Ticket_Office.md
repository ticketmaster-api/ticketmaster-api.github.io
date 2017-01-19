---
layout: tutorials-single
categories:
  - tutorials
  - tutorials-sample-apps

title: Ticket Office

img: "/products-and-docs/tutorials/img/ticket-office-thumbnail.png"

link: "/products-and-docs/tutorials/sample-apps/Ticket_Office.html"

announcement: "Node.js, React, Redux implementation of ticketing e-commerce."

tags:
  - Discovery API
  - Commerce API

excerpt: Node.js, React, Redux implementation of ticketing e-commerce.
---

# TICKET OFFICE

## Introduction

The purpose of this web application is to demonstrate the use cases of varies Discovery, Commerce, OAuth and Waves APIs in a typical event-orientated, end-to-end e-commerce workflow. Through adapting one of today’s popular tech stacks (Node.js, Facebook React, Redux etc.) and abstracting reusable logic into NPM module, it is designed to help developers to speed up integration and/or exploration of APIs.

## NPM module

An NPM module ([tm-api](https://www.npmjs.com/package/tm-api)) is to help making connection easier. With this module, you can:

* Get details of events, venues, attractions (i.e. artist), classifications (i.e. event genre), and event offers.
* Search events, venues, attractions and classifications
* Get event images
* Get details of, create, empty, update cart
* Get available delivery methods of cart
* Add new payment instrument to cart
* Select delivery and payment instruments to cart
* Complete order with cart
* Authorize OAuth token
* Refresh OAuth token

## Prerequisites

1. Install Node.js for your environment (including npm)
2. Obtain a Ticketmaster API Key - [instructions](/products-and-docs/tutorials/widgets/Event_Discovery_Widget.html#get-an-api-key)
3. (Optional) Install GIT

## Installation

1. Clone directly from [GIT repository](https://github.com/ticketmaster-api/ticketoffice-app) or [download](https://github.com/ticketmaster-api/ticketoffice-app/archive/master.zip) source archive
2. Edit /ticketoffice-app/src/resources/properties.json and update API key, secret, application root URL
3. Command: cd ticketoffice-app
4. Command: npm install
5. Command: export NODE_ENV=development
6. Command: npm start
7. Open http://localhost:3002 in browser

## Running options

* npm run clean: remove /dist
* npm run slate: remove /node_modules and reinstall all dependencies
* npm run start/ npm start: start application in development mode (auto refresh)
* npm run build: clean + webpack build out to /dist
* npm run start-prod: run application in /dist
* npm run test: run unit test w/ nyan reporter
* npm run test-spec: run unit test w/ full spec reporter
* npm run lint: aslant check

## Application notes

Isomorphic: This demo is setup as isomorphic, that means pages are rendered both server side and client side. For example, user can search for events with keywords, then navigates to the event detail page. At this point, the event detail page is rendered on client side. User can also bookmark the URL and later visits directly, page is rendered on server side and then sent to browser. In order to achieve this, syncinization of application achieve by gathering data on server side first, then serialized into string and populated in initial page load via INITIAL_STATE (/ticketoffice-app/src/server/handlers/reactRouting.js) and later transformed to React store (/ticketoffice-app/src/client/index.js)

Redux: This demo adapts React Redux pattern for state management. Any event that will cause change in application triggers action with necessary payload. Action then causes reducer to change the state of application. Once state of application is updated, React reacts to the change the update the UI accordingly. If particular action involves async calls outward to API (e.g. to fetch event details, /ticketoffice-app/src/common/actions/eventDetails.js), a middleware is involved and look for a specific property “promise” in action payload. Middleware intercepts the request, pass it to NPM module “tm-api” (which return Promise object). When data is returned on success, it triggers another event (e.g. EVENT_DETAILS_GET_SUCCESS) to modify the state via reducer (/ticketoffice-app/src/common/reducers/eventDetails.js).

Abstraction: The demo contains front-end, back-end business logic, styles (CSS) and few SVG asset. The complexity of composing XMLHttpRequest is done within NPM module “tm-api”. It is simply a library of member functions. Each one of the functions takes parameters and payload and returns Promise object which can be used to handle async events upon success and error.

Proxy operations: Several API endpoints (e.g. create cart, update cart, select payments) accept “pollingCallbackUrl” in request body. This indicates result may or may not be part of the server response. In case of latter, a separate POST request will be initiated from Ticketmaster to designated callback URL with the result as part of payload. Application should create an endpoint to listen traffic on this URL and respond with a status code 200 (otherwise, further attempts to re-POST from Ticketmaster will be scheduled). In the demo application, application first establish socket connectivity and store this SID into a hash table. When polling is on, server side process the payload and push to client via socket events.
