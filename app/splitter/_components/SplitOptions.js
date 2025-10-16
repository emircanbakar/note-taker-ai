"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scissors } from "lucide-react";

function SplitOptions({ selectedOption, onOptionChange, disabled }) {
  const options = [
    { value: 2, label: "2 Parça", description: "PDF'i 2 eşit parçaya böl" },
    { value: 3, label: "3 Parça", description: "PDF'i 3 eşit parçaya böl" },
    { value: 4, label: "4 Parça", description: "PDF'i 4 eşit parçaya böl" },
    { value: 5, label: "5 Parça", description: "PDF'i 5 eşit parçaya böl" },
  ];

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <Card
          key={option.value}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedOption === option.value
              ? "border-primary bg-primary/5"
              : disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-primary/50"
          }`}
          onClick={() => !disabled && onOptionChange(option.value)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Scissors
                  className={`h-5 w-5 ${
                    selectedOption === option.value
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {option.description}
                  </div>
                </div>
              </div>
              {selectedOption === option.value && (
                <Badge variant="default" className="bg-primary">
                  Seçili
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default SplitOptions;
