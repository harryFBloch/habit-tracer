import { ActionType } from "../actionTypes";
import { Flags } from "./types";
import { RootAction } from "..";
import { IAPProduct } from '@ionic-native/in-app-purchase-2';

const initialState: Flags = {
  showInterAd: false,
  products: [] as IAPProduct[],
  removeAds: false
};

export default function auth(state=initialState, action: RootAction): typeof initialState  {
  switch (action.type) {
  
    case (ActionType.SHOW_INTER_AD):
      return {...state, showInterAd: true};

    case (ActionType.CLOSE_INTER_AD):
      return {...state, showInterAd: false}

    case (ActionType.GET_PRODUCTS):
      return {...state, products: action.products}

    case (ActionType.REMOVE_ADS):
      return {...state, removeAds: true}

    default:
      return state;
  }
}