import styled, { keyframes } from "styled-components";
import { IonContent } from "@ionic/react";
import { renderToStaticMarkup } from "react-dom/server";
import WaveBlob from "../icons/WaveBlob";
import React from "react";
import { moveWave } from "./keyframes";

const waveBlobString = encodeURIComponent(renderToStaticMarkup(<WaveBlob/>));

export const IonContentWithBackground = styled(IonContent)`
--background: none;
background: url("data:image/svg+xml,${ waveBlobString }");
background-size: cover;
background-position-x: 400px;
animation: ${ moveWave } 42s infinite ease-in-out alternate;
`;