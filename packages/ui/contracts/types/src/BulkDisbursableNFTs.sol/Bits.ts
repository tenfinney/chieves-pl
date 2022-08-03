/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface BitsInterface extends utils.Interface {
  functions: {
    "ADDRESS_TYPE()": FunctionFragment;
    "COUNTER_MASK()": FunctionFragment;
    "COUNTER_WIDTH()": FunctionFragment;
    "DISABLING_TYPE()": FunctionFragment;
    "EXPERIMENTAL_TYPE()": FunctionFragment;
    "GATING_TYPE()": FunctionFragment;
    "INTERNAL_BOUNDARY()": FunctionFragment;
    "INTERNAL_MASK()": FunctionFragment;
    "INTERNAL_WIDTH()": FunctionFragment;
    "MEMBERSHIP_TYPE()": FunctionFragment;
    "NO_MATCH_FLAGS()": FunctionFragment;
    "REACTION_TYPE()": FunctionFragment;
    "RECORDED_TIME_TYPE()": FunctionFragment;
    "RECORDING_TYPE()": FunctionFragment;
    "REPETITION_BOUNDARY()": FunctionFragment;
    "REPETITION_MASK()": FunctionFragment;
    "REPETITION_WIDTH()": FunctionFragment;
    "REQUIREMENT_BOUNDARY()": FunctionFragment;
    "REQUIREMENT_MASK()": FunctionFragment;
    "REQUIREMENT_WIDTH()": FunctionFragment;
    "REQUIRE_ALL()": FunctionFragment;
    "REQUIRE_NONE()": FunctionFragment;
    "REQUIRE_ONE()": FunctionFragment;
    "REVIEW_TYPE()": FunctionFragment;
    "ROLE_BOUNDARY()": FunctionFragment;
    "ROLE_MASK()": FunctionFragment;
    "ROLE_WIDTH()": FunctionFragment;
    "TEAM_1()": FunctionFragment;
    "TEAM_2()": FunctionFragment;
    "TEAM_3()": FunctionFragment;
    "TEAM_4()": FunctionFragment;
    "TEAM_5()": FunctionFragment;
    "TEAM_6()": FunctionFragment;
    "TEAM_7()": FunctionFragment;
    "TEAM_8()": FunctionFragment;
    "TEAM_9()": FunctionFragment;
    "TEAM_A()": FunctionFragment;
    "TEAM_B()": FunctionFragment;
    "TEAM_BOUNDARY()": FunctionFragment;
    "TEAM_C()": FunctionFragment;
    "TEAM_D()": FunctionFragment;
    "TEAM_MASK()": FunctionFragment;
    "TEAM_WIDTH()": FunctionFragment;
    "TYPE_BOUNDARY()": FunctionFragment;
    "TYPE_MASK()": FunctionFragment;
    "TYPE_WIDTH()": FunctionFragment;
    "UNIQUE()": FunctionFragment;
    "UNIQUENESS_BOUNDARY()": FunctionFragment;
    "UNIQUENESS_MASK()": FunctionFragment;
    "UNIQUENESS_WIDTH()": FunctionFragment;
    "USE_AFTER()": FunctionFragment;
    "USE_ONCE()": FunctionFragment;
    "USE_UNLIMITED()": FunctionFragment;
    "USE_UNTIL()": FunctionFragment;
    "VANILLA_TYPE()": FunctionFragment;
    "VOUCHED_TIME_TYPE()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ADDRESS_TYPE"
      | "COUNTER_MASK"
      | "COUNTER_WIDTH"
      | "DISABLING_TYPE"
      | "EXPERIMENTAL_TYPE"
      | "GATING_TYPE"
      | "INTERNAL_BOUNDARY"
      | "INTERNAL_MASK"
      | "INTERNAL_WIDTH"
      | "MEMBERSHIP_TYPE"
      | "NO_MATCH_FLAGS"
      | "REACTION_TYPE"
      | "RECORDED_TIME_TYPE"
      | "RECORDING_TYPE"
      | "REPETITION_BOUNDARY"
      | "REPETITION_MASK"
      | "REPETITION_WIDTH"
      | "REQUIREMENT_BOUNDARY"
      | "REQUIREMENT_MASK"
      | "REQUIREMENT_WIDTH"
      | "REQUIRE_ALL"
      | "REQUIRE_NONE"
      | "REQUIRE_ONE"
      | "REVIEW_TYPE"
      | "ROLE_BOUNDARY"
      | "ROLE_MASK"
      | "ROLE_WIDTH"
      | "TEAM_1"
      | "TEAM_2"
      | "TEAM_3"
      | "TEAM_4"
      | "TEAM_5"
      | "TEAM_6"
      | "TEAM_7"
      | "TEAM_8"
      | "TEAM_9"
      | "TEAM_A"
      | "TEAM_B"
      | "TEAM_BOUNDARY"
      | "TEAM_C"
      | "TEAM_D"
      | "TEAM_MASK"
      | "TEAM_WIDTH"
      | "TYPE_BOUNDARY"
      | "TYPE_MASK"
      | "TYPE_WIDTH"
      | "UNIQUE"
      | "UNIQUENESS_BOUNDARY"
      | "UNIQUENESS_MASK"
      | "UNIQUENESS_WIDTH"
      | "USE_AFTER"
      | "USE_ONCE"
      | "USE_UNLIMITED"
      | "USE_UNTIL"
      | "VANILLA_TYPE"
      | "VOUCHED_TIME_TYPE"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ADDRESS_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "COUNTER_MASK",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "COUNTER_WIDTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DISABLING_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "EXPERIMENTAL_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "GATING_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "INTERNAL_BOUNDARY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "INTERNAL_MASK",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "INTERNAL_WIDTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MEMBERSHIP_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "NO_MATCH_FLAGS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REACTION_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "RECORDED_TIME_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "RECORDING_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REPETITION_BOUNDARY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REPETITION_MASK",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REPETITION_WIDTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REQUIREMENT_BOUNDARY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REQUIREMENT_MASK",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REQUIREMENT_WIDTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REQUIRE_ALL",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REQUIRE_NONE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REQUIRE_ONE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REVIEW_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ROLE_BOUNDARY",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "ROLE_MASK", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ROLE_WIDTH",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "TEAM_1", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_2", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_3", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_4", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_5", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_6", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_7", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_8", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_9", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_A", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_B", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "TEAM_BOUNDARY",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "TEAM_C", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_D", values?: undefined): string;
  encodeFunctionData(functionFragment: "TEAM_MASK", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "TEAM_WIDTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TYPE_BOUNDARY",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "TYPE_MASK", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "TYPE_WIDTH",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "UNIQUE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "UNIQUENESS_BOUNDARY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "UNIQUENESS_MASK",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "UNIQUENESS_WIDTH",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "USE_AFTER", values?: undefined): string;
  encodeFunctionData(functionFragment: "USE_ONCE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "USE_UNLIMITED",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "USE_UNTIL", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "VANILLA_TYPE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "VOUCHED_TIME_TYPE",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "ADDRESS_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "COUNTER_MASK",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "COUNTER_WIDTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DISABLING_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "EXPERIMENTAL_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "GATING_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "INTERNAL_BOUNDARY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "INTERNAL_MASK",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "INTERNAL_WIDTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MEMBERSHIP_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "NO_MATCH_FLAGS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REACTION_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "RECORDED_TIME_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "RECORDING_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REPETITION_BOUNDARY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REPETITION_MASK",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REPETITION_WIDTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REQUIREMENT_BOUNDARY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REQUIREMENT_MASK",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REQUIREMENT_WIDTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REQUIRE_ALL",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REQUIRE_NONE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REQUIRE_ONE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REVIEW_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ROLE_BOUNDARY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ROLE_MASK", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ROLE_WIDTH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_3", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_4", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_5", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_6", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_7", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_8", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_9", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_A", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_B", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "TEAM_BOUNDARY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "TEAM_C", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_D", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_MASK", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TEAM_WIDTH", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "TYPE_BOUNDARY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "TYPE_MASK", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TYPE_WIDTH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "UNIQUE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "UNIQUENESS_BOUNDARY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "UNIQUENESS_MASK",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "UNIQUENESS_WIDTH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "USE_AFTER", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "USE_ONCE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "USE_UNLIMITED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "USE_UNTIL", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "VANILLA_TYPE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "VOUCHED_TIME_TYPE",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Bits extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BitsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ADDRESS_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    COUNTER_MASK(overrides?: CallOverrides): Promise<[BigNumber]>;

    COUNTER_WIDTH(overrides?: CallOverrides): Promise<[number]>;

    DISABLING_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    EXPERIMENTAL_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    GATING_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    INTERNAL_BOUNDARY(overrides?: CallOverrides): Promise<[number]>;

    INTERNAL_MASK(overrides?: CallOverrides): Promise<[BigNumber]>;

    INTERNAL_WIDTH(overrides?: CallOverrides): Promise<[number]>;

    MEMBERSHIP_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    NO_MATCH_FLAGS(overrides?: CallOverrides): Promise<[BigNumber]>;

    REACTION_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    RECORDED_TIME_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    RECORDING_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    REPETITION_BOUNDARY(overrides?: CallOverrides): Promise<[number]>;

    REPETITION_MASK(overrides?: CallOverrides): Promise<[BigNumber]>;

    REPETITION_WIDTH(overrides?: CallOverrides): Promise<[number]>;

    REQUIREMENT_BOUNDARY(overrides?: CallOverrides): Promise<[number]>;

    REQUIREMENT_MASK(overrides?: CallOverrides): Promise<[BigNumber]>;

    REQUIREMENT_WIDTH(overrides?: CallOverrides): Promise<[number]>;

    REQUIRE_ALL(overrides?: CallOverrides): Promise<[BigNumber]>;

    REQUIRE_NONE(overrides?: CallOverrides): Promise<[BigNumber]>;

    REQUIRE_ONE(overrides?: CallOverrides): Promise<[BigNumber]>;

    REVIEW_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    ROLE_BOUNDARY(overrides?: CallOverrides): Promise<[number]>;

    ROLE_MASK(overrides?: CallOverrides): Promise<[BigNumber]>;

    ROLE_WIDTH(overrides?: CallOverrides): Promise<[number]>;

    TEAM_1(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_2(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_3(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_4(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_5(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_6(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_7(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_8(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_9(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_A(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_B(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_BOUNDARY(overrides?: CallOverrides): Promise<[number]>;

    TEAM_C(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_D(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_MASK(overrides?: CallOverrides): Promise<[BigNumber]>;

    TEAM_WIDTH(overrides?: CallOverrides): Promise<[number]>;

    TYPE_BOUNDARY(overrides?: CallOverrides): Promise<[number]>;

    TYPE_MASK(overrides?: CallOverrides): Promise<[BigNumber]>;

    TYPE_WIDTH(overrides?: CallOverrides): Promise<[number]>;

    UNIQUE(overrides?: CallOverrides): Promise<[BigNumber]>;

    UNIQUENESS_BOUNDARY(overrides?: CallOverrides): Promise<[number]>;

    UNIQUENESS_MASK(overrides?: CallOverrides): Promise<[BigNumber]>;

    UNIQUENESS_WIDTH(overrides?: CallOverrides): Promise<[number]>;

    USE_AFTER(overrides?: CallOverrides): Promise<[BigNumber]>;

    USE_ONCE(overrides?: CallOverrides): Promise<[BigNumber]>;

    USE_UNLIMITED(overrides?: CallOverrides): Promise<[BigNumber]>;

    USE_UNTIL(overrides?: CallOverrides): Promise<[BigNumber]>;

    VANILLA_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;

    VOUCHED_TIME_TYPE(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  ADDRESS_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  COUNTER_MASK(overrides?: CallOverrides): Promise<BigNumber>;

  COUNTER_WIDTH(overrides?: CallOverrides): Promise<number>;

  DISABLING_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  EXPERIMENTAL_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  GATING_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  INTERNAL_BOUNDARY(overrides?: CallOverrides): Promise<number>;

  INTERNAL_MASK(overrides?: CallOverrides): Promise<BigNumber>;

  INTERNAL_WIDTH(overrides?: CallOverrides): Promise<number>;

  MEMBERSHIP_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  NO_MATCH_FLAGS(overrides?: CallOverrides): Promise<BigNumber>;

  REACTION_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  RECORDED_TIME_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  RECORDING_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  REPETITION_BOUNDARY(overrides?: CallOverrides): Promise<number>;

  REPETITION_MASK(overrides?: CallOverrides): Promise<BigNumber>;

  REPETITION_WIDTH(overrides?: CallOverrides): Promise<number>;

  REQUIREMENT_BOUNDARY(overrides?: CallOverrides): Promise<number>;

  REQUIREMENT_MASK(overrides?: CallOverrides): Promise<BigNumber>;

  REQUIREMENT_WIDTH(overrides?: CallOverrides): Promise<number>;

  REQUIRE_ALL(overrides?: CallOverrides): Promise<BigNumber>;

  REQUIRE_NONE(overrides?: CallOverrides): Promise<BigNumber>;

  REQUIRE_ONE(overrides?: CallOverrides): Promise<BigNumber>;

  REVIEW_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  ROLE_BOUNDARY(overrides?: CallOverrides): Promise<number>;

  ROLE_MASK(overrides?: CallOverrides): Promise<BigNumber>;

  ROLE_WIDTH(overrides?: CallOverrides): Promise<number>;

  TEAM_1(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_2(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_3(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_4(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_5(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_6(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_7(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_8(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_9(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_A(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_B(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_BOUNDARY(overrides?: CallOverrides): Promise<number>;

  TEAM_C(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_D(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_MASK(overrides?: CallOverrides): Promise<BigNumber>;

  TEAM_WIDTH(overrides?: CallOverrides): Promise<number>;

  TYPE_BOUNDARY(overrides?: CallOverrides): Promise<number>;

  TYPE_MASK(overrides?: CallOverrides): Promise<BigNumber>;

  TYPE_WIDTH(overrides?: CallOverrides): Promise<number>;

  UNIQUE(overrides?: CallOverrides): Promise<BigNumber>;

  UNIQUENESS_BOUNDARY(overrides?: CallOverrides): Promise<number>;

  UNIQUENESS_MASK(overrides?: CallOverrides): Promise<BigNumber>;

  UNIQUENESS_WIDTH(overrides?: CallOverrides): Promise<number>;

  USE_AFTER(overrides?: CallOverrides): Promise<BigNumber>;

  USE_ONCE(overrides?: CallOverrides): Promise<BigNumber>;

  USE_UNLIMITED(overrides?: CallOverrides): Promise<BigNumber>;

  USE_UNTIL(overrides?: CallOverrides): Promise<BigNumber>;

  VANILLA_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  VOUCHED_TIME_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    ADDRESS_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    COUNTER_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    COUNTER_WIDTH(overrides?: CallOverrides): Promise<number>;

    DISABLING_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    EXPERIMENTAL_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    GATING_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    INTERNAL_BOUNDARY(overrides?: CallOverrides): Promise<number>;

    INTERNAL_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    INTERNAL_WIDTH(overrides?: CallOverrides): Promise<number>;

    MEMBERSHIP_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    NO_MATCH_FLAGS(overrides?: CallOverrides): Promise<BigNumber>;

    REACTION_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    RECORDED_TIME_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    RECORDING_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    REPETITION_BOUNDARY(overrides?: CallOverrides): Promise<number>;

    REPETITION_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    REPETITION_WIDTH(overrides?: CallOverrides): Promise<number>;

    REQUIREMENT_BOUNDARY(overrides?: CallOverrides): Promise<number>;

    REQUIREMENT_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    REQUIREMENT_WIDTH(overrides?: CallOverrides): Promise<number>;

    REQUIRE_ALL(overrides?: CallOverrides): Promise<BigNumber>;

    REQUIRE_NONE(overrides?: CallOverrides): Promise<BigNumber>;

    REQUIRE_ONE(overrides?: CallOverrides): Promise<BigNumber>;

    REVIEW_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    ROLE_BOUNDARY(overrides?: CallOverrides): Promise<number>;

    ROLE_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    ROLE_WIDTH(overrides?: CallOverrides): Promise<number>;

    TEAM_1(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_2(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_3(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_4(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_5(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_6(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_7(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_8(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_9(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_A(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_B(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_BOUNDARY(overrides?: CallOverrides): Promise<number>;

    TEAM_C(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_D(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_WIDTH(overrides?: CallOverrides): Promise<number>;

    TYPE_BOUNDARY(overrides?: CallOverrides): Promise<number>;

    TYPE_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    TYPE_WIDTH(overrides?: CallOverrides): Promise<number>;

    UNIQUE(overrides?: CallOverrides): Promise<BigNumber>;

    UNIQUENESS_BOUNDARY(overrides?: CallOverrides): Promise<number>;

    UNIQUENESS_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    UNIQUENESS_WIDTH(overrides?: CallOverrides): Promise<number>;

    USE_AFTER(overrides?: CallOverrides): Promise<BigNumber>;

    USE_ONCE(overrides?: CallOverrides): Promise<BigNumber>;

    USE_UNLIMITED(overrides?: CallOverrides): Promise<BigNumber>;

    USE_UNTIL(overrides?: CallOverrides): Promise<BigNumber>;

    VANILLA_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    VOUCHED_TIME_TYPE(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    ADDRESS_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    COUNTER_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    COUNTER_WIDTH(overrides?: CallOverrides): Promise<BigNumber>;

    DISABLING_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    EXPERIMENTAL_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    GATING_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    INTERNAL_BOUNDARY(overrides?: CallOverrides): Promise<BigNumber>;

    INTERNAL_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    INTERNAL_WIDTH(overrides?: CallOverrides): Promise<BigNumber>;

    MEMBERSHIP_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    NO_MATCH_FLAGS(overrides?: CallOverrides): Promise<BigNumber>;

    REACTION_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    RECORDED_TIME_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    RECORDING_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    REPETITION_BOUNDARY(overrides?: CallOverrides): Promise<BigNumber>;

    REPETITION_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    REPETITION_WIDTH(overrides?: CallOverrides): Promise<BigNumber>;

    REQUIREMENT_BOUNDARY(overrides?: CallOverrides): Promise<BigNumber>;

    REQUIREMENT_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    REQUIREMENT_WIDTH(overrides?: CallOverrides): Promise<BigNumber>;

    REQUIRE_ALL(overrides?: CallOverrides): Promise<BigNumber>;

    REQUIRE_NONE(overrides?: CallOverrides): Promise<BigNumber>;

    REQUIRE_ONE(overrides?: CallOverrides): Promise<BigNumber>;

    REVIEW_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    ROLE_BOUNDARY(overrides?: CallOverrides): Promise<BigNumber>;

    ROLE_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    ROLE_WIDTH(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_1(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_2(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_3(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_4(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_5(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_6(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_7(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_8(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_9(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_A(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_B(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_BOUNDARY(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_C(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_D(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    TEAM_WIDTH(overrides?: CallOverrides): Promise<BigNumber>;

    TYPE_BOUNDARY(overrides?: CallOverrides): Promise<BigNumber>;

    TYPE_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    TYPE_WIDTH(overrides?: CallOverrides): Promise<BigNumber>;

    UNIQUE(overrides?: CallOverrides): Promise<BigNumber>;

    UNIQUENESS_BOUNDARY(overrides?: CallOverrides): Promise<BigNumber>;

    UNIQUENESS_MASK(overrides?: CallOverrides): Promise<BigNumber>;

    UNIQUENESS_WIDTH(overrides?: CallOverrides): Promise<BigNumber>;

    USE_AFTER(overrides?: CallOverrides): Promise<BigNumber>;

    USE_ONCE(overrides?: CallOverrides): Promise<BigNumber>;

    USE_UNLIMITED(overrides?: CallOverrides): Promise<BigNumber>;

    USE_UNTIL(overrides?: CallOverrides): Promise<BigNumber>;

    VANILLA_TYPE(overrides?: CallOverrides): Promise<BigNumber>;

    VOUCHED_TIME_TYPE(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ADDRESS_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    COUNTER_MASK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    COUNTER_WIDTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    DISABLING_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    EXPERIMENTAL_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    GATING_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    INTERNAL_BOUNDARY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    INTERNAL_MASK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    INTERNAL_WIDTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MEMBERSHIP_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    NO_MATCH_FLAGS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REACTION_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    RECORDED_TIME_TYPE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    RECORDING_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REPETITION_BOUNDARY(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    REPETITION_MASK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REPETITION_WIDTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REQUIREMENT_BOUNDARY(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    REQUIREMENT_MASK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REQUIREMENT_WIDTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REQUIRE_ALL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REQUIRE_NONE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REQUIRE_ONE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REVIEW_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ROLE_BOUNDARY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ROLE_MASK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ROLE_WIDTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_1(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_2(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_3(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_4(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_5(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_6(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_7(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_8(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_9(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_A(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_B(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_BOUNDARY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_C(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_D(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_MASK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEAM_WIDTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TYPE_BOUNDARY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TYPE_MASK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TYPE_WIDTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    UNIQUE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    UNIQUENESS_BOUNDARY(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    UNIQUENESS_MASK(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    UNIQUENESS_WIDTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USE_AFTER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USE_ONCE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USE_UNLIMITED(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USE_UNTIL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    VANILLA_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    VOUCHED_TIME_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
