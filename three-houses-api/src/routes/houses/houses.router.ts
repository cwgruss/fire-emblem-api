// ----------------------------------------
//  Fire Emblem Houses Router:
// ---
//  Saturday, April 04 2020
// ----------------------------------------
import express, { Request, Response } from "express";
import * as FEHouseService from "../../core/houses/houses.service";
import { Houses } from "../../core/houses/houses.interface";
import { FireEmblemHouse } from "../../core/houses/house.interface";
import { checkJwt } from "../../middleware/authorization/auth0.middleware";
import { checkPermissions } from "../../middleware/permissions/permissions.middleware";
import { HousePermissions } from "../../core/houses/house.permissions";

/** Router Definition */
export const HousesRouter = express.Router();

/** Controller Definitions */

// ** GET houses/
// ******************************************
HousesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const houses: Houses = await FEHouseService.findAll();
    res.status(200).send(houses);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// ** GET houses/:id
// ******************************************
HousesRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const house: FireEmblemHouse = await FEHouseService.find(id);
    res.status(200).send(house);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// # Authorization JWT
HousesRouter.use(checkJwt);

// ** POST houses/
// ******************************************
HousesRouter.post(
  "/",
  checkPermissions(HousePermissions.CreateHouses),
  async (req: Request, res: Response) => {
    try {
      const house: FireEmblemHouse = req.body.house;
      await FEHouseService.create(house);
      res.sendStatus(201);
    } catch (e) {
      res.status(404).send(e.message);
    }
  }
);

// ** PUT houses/
// ******************************************
HousesRouter.put(
  "/",
  checkPermissions(HousePermissions.UpdateHouses),
  async (req: Request, res: Response) => {
    try {
      const house: FireEmblemHouse = req.body.house;
      await FEHouseService.update(house);
      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

// ** DELETE houses/:id
// ******************************************
HousesRouter.delete(
  "/:id",
  checkPermissions(HousePermissions.DeleteHouses),
  async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await FEHouseService.remove(id);
      res.sendStatus(200);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);
