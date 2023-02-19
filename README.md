https://nastusya-max.github.io/product-dimensions/
# Create control that can be used for displaying multiple product dimensions.

Control should receive and display array of elements called 'custom product dimensions' 

*	Dimension ID
*	Dimension name label
*	Lookup values

JSON example
```
[
   {
      "dimensionId":"1",
      "dimensionName":"Style",
      "selectLabel":"Select a style",
      "values":[
         {
            "valueId":"style-1",
            "title":"Style 1"
         },
         {
            "valueId":"style-2",
            "title":"Style 2"
         },
         {
            "valueId":"style-3",
            "title":"Style 3"
         }
      ]
   },
   {
      "dimensionId":"2",
      "dimensionName":"Size",
      "selectLabel":"Select a size",
      "values":[
         {
            "valueId":"size-s",
            "title":"S"
         },
         {
            "valueId":"size-l",
            "title":"L"
         },
         {
            "valueId":"size-xl",
            "title":"XL"
         }
      ]
   }
]
```
Each product dimension - 1 separate lookup control (Style, Size, Color, etc. are dimensions) 

## Lookups behavior:  

*	In the beginning only the 1st top lookup is enabled, others are disabled 
*	When user selects the value in the 1st top lookup, the 2nd lookup becomes enabled to select the value
*	When user selects the value in the 2nd top lookup, the 3nd lookup becomes enabled to select the value
*	When user selects another value in 1st lookup, values in 2nd and 3nd controls are reset to default value and 3nd lookup is disabled

Control should have button that logs to console selected dimension values

## Requirements:

*	Use JavaScript + CSS + HTML Stack
*	Use knockout.js for UI logic
*	Store dimensions JSON in a separate file and pass it to control via parameter
