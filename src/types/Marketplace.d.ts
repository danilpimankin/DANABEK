/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MarketplaceInterface extends ethers.utils.Interface {
  functions: {
    "_listings(uint256)": FunctionFragment;
    "buyItem(uint256)": FunctionFragment;
    "cancelListing(uint256)": FunctionFragment;
    "listItem(uint256,uint256,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_listings",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "buyItem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelListing",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "listItem",
    values: [BigNumberish, BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "_listings", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buyItem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelListing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "listItem", data: BytesLike): Result;

  events: {
    "BuyItem(address,uint256,uint256)": EventFragment;
    "CancelListing(address,uint256)": EventFragment;
    "ListItem(address,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BuyItem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CancelListing"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ListItem"): EventFragment;
}

export type BuyItemEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    _buyer: string;
    _tokenId: BigNumber;
    _price: BigNumber;
  }
>;

export type CancelListingEvent = TypedEvent<
  [string, BigNumber] & { _seller: string; _tokenId: BigNumber }
>;

export type ListItemEvent = TypedEvent<
  [string, BigNumber, string, BigNumber] & {
    _seller: string;
    _tokenId: BigNumber;
    _tokenAddress: string;
    _price: BigNumber;
  }
>;

export class Marketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MarketplaceInterface;

  functions: {
    _listings(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber] & {
        owner: string;
        tokenAddress: string;
        price: BigNumber;
      }
    >;

    buyItem(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    cancelListing(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    listItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      _tokenAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  _listings(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber] & {
      owner: string;
      tokenAddress: string;
      price: BigNumber;
    }
  >;

  buyItem(
    _tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  cancelListing(
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  listItem(
    _tokenId: BigNumberish,
    _price: BigNumberish,
    _tokenAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _listings(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber] & {
        owner: string;
        tokenAddress: string;
        price: BigNumber;
      }
    >;

    buyItem(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    cancelListing(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    listItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      _tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BuyItem(address,uint256,uint256)"(
      _buyer?: string | null,
      _tokenId?: BigNumberish | null,
      _price?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { _buyer: string; _tokenId: BigNumber; _price: BigNumber }
    >;

    BuyItem(
      _buyer?: string | null,
      _tokenId?: BigNumberish | null,
      _price?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { _buyer: string; _tokenId: BigNumber; _price: BigNumber }
    >;

    "CancelListing(address,uint256)"(
      _seller?: string | null,
      _tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber],
      { _seller: string; _tokenId: BigNumber }
    >;

    CancelListing(
      _seller?: string | null,
      _tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber],
      { _seller: string; _tokenId: BigNumber }
    >;

    "ListItem(address,uint256,address,uint256)"(
      _seller?: string | null,
      _tokenId?: BigNumberish | null,
      _tokenAddress?: null,
      _price?: null
    ): TypedEventFilter<
      [string, BigNumber, string, BigNumber],
      {
        _seller: string;
        _tokenId: BigNumber;
        _tokenAddress: string;
        _price: BigNumber;
      }
    >;

    ListItem(
      _seller?: string | null,
      _tokenId?: BigNumberish | null,
      _tokenAddress?: null,
      _price?: null
    ): TypedEventFilter<
      [string, BigNumber, string, BigNumber],
      {
        _seller: string;
        _tokenId: BigNumber;
        _tokenAddress: string;
        _price: BigNumber;
      }
    >;
  };

  estimateGas: {
    _listings(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    buyItem(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    cancelListing(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    listItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      _tokenAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _listings(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    buyItem(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    cancelListing(
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    listItem(
      _tokenId: BigNumberish,
      _price: BigNumberish,
      _tokenAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
