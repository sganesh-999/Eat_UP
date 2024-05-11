import { render,screen } from "@testing-library/react";
import RestaurantCard from '../RestaurantCard'

import MOCK_DATA from '../mocks/ResCardMock.json'
import { expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe('Name available in restaurant card',()=>{
    it("should render RestaurantCard Component with props data",()=>{
        render(
            <BrowserRouter>
            <RestaurantCard restaurant={MOCK_DATA}/>
            </BrowserRouter>
        )
        
        const name = screen.getByText("Chandrika Biriyani Family Point")
        // console.log(name)
        expect(name).toBeInTheDocument()
        
        })
  }
  )