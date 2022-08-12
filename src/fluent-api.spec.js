"use strict";

const { expect, describe, it } = require("@jest/globals");
const FluentAPI = require("./fluent-api");
const contentMock = require("./mocks/acces-stage-file-mock");

describe("Fluent API Unit Tests", () => {
  it("should be able to build", () => {
    const api = new FluentAPI({ content: contentMock });
    const data = api.build();

    expect(data).toStrictEqual(contentMock);
  });

  it("should be able to extract data", () => {
    const api = new FluentAPI({ content: contentMock });

    const data = api.extractData().build();

    const expected = {
      header:
        "000000001027936211000197202207251415EXPORTACAO ASCARTOES     003",
      transactions: [
        "110000002027936211000600FILIAL 06                     000024712121222137192929    024712         000527407******7765 202107282022072500000000001691600000000000034100000000000000000000000000000000000000001657500000000000010101802842229    264324                                                                                                                                                                                                                                                                                                                                                                                                      ",
        "110000003027936211000600FILIAL 06                     000094600121222138613318    094600         000527407******9175 202107292022072500000000000929000000000000018700000000000000000000000000000000000000000910300000000000010101802842229    264324                                                                                                         ",
      ],
      cancellations: [
        "12001537086754629       APP Filial 31                 0542492360 1018576769       005999         534516******3761    2021112420220725-00000000015640-00000000000352-00000000015640           010201800142229    3331421                                                               CANCELAMENTO DE VENDA                                                  ",
        "12001537187138204       APP Filial 50                 0318494761010754985227      027501         535081******3074    2021092220220725-00000000005664-00000000000134-00000000005664           0102018001341364   322859                                                                CANCELAMENTO DE VENDA                                                  ",
      ],
      trailler:
        "9900153720000002                                                                                                                                                                                                                                                                                                                                             ",
    };

    expect(data).toStrictEqual(expected);
  });

  it("should be able to map fields", () => {
    const content = {
      header:
        "000000001027936211000197202207251415EXPORTACAO ASCARTOES     003",
      transactions: [
        "110000002027936211000600FILIAL 06                     000024712121222137192929    024712         000527407******7765 202107282022072500000000001691600000000000034100000000000000000000000000000000000000001657500000000000010101802842229    264324                                                                                                                                                                                                                                                                                                                                                                                                      ",
        "110000003027936211000600FILIAL 06                     000094600121222138613318    094600         000527407******9175 202107292022072500000000000929000000000000018700000000000000000000000000000000000000000910300000000000010101802842229    264324                                                                                                         ",
      ],
      cancellations: [
        "12001537086754629       APP Filial 31                 0542492360 1018576769       005999         534516******3761    2021112420220725-00000000015640-00000000000352-00000000015640           010201800142229    3331421                                                               CANCELAMENTO DE VENDA                                                  ",
        "12001537187138204       APP Filial 50                 0318494761010754985227      027501         535081******3074    2021092220220725-00000000005664-00000000000134-00000000005664           0102018001341364   322859                                                                CANCELAMENTO DE VENDA                                                  ",
      ],
      trailler:
        "9900153720000002                                                                                                                                                                                                                                                                                                                                             ",
    };
    const api = new FluentAPI({ content });

    const data = api.mapFields().build();

    const expected = {
      header: {
        registerType: "00",
        sequentialNumber: "0000001",
        cnpj: "027936211000197",
        generationDate: "20220725",
        generationHour: "1415",
        description: "EXPORTACAO ASCARTOES     ",
        layoutVersion: "003",
        filler: "",
      },
      transactions: [
        {
          registerType: "11",
          sequentialNumber: "0000002",
          establishmentNumber: "027936211000600",
          establishmentName: "FILIAL 06                     ",
          lotNumber: "000024712",
          installment: "12",
          plan: "12",
          nsu: "22137192929    ",
          authorization: "024712         ",
          card: "000527407******7765 ",
          saleDate: "20210728",
          creditDate: "20220725",
          grossValue: "000000000016916",
          administrativeFee: "000000000000341",
          filler: "000000000000000",
          anticipationFee: "000000000000000",
          liquidValue: "000000000016575",
          anticipationNumber: "00000000000",
          exportType: "01",
          status: "01",
          product: "018",
          operator: "028",
          bank: "422",
          agency: "29    ",
          account: "264324              ",
          reconciliationId:
            "                                                  ",
          filler2: "                                         ",
        },
        {
          registerType: "11",
          sequentialNumber: "0000003",
          establishmentNumber: "027936211000600",
          establishmentName: "FILIAL 06                     ",
          lotNumber: "000094600",
          installment: "12",
          plan: "12",
          nsu: "22138613318    ",
          authorization: "094600         ",
          card: "000527407******9175 ",
          saleDate: "20210729",
          creditDate: "20220725",
          grossValue: "000000000009290",
          administrativeFee: "000000000000187",
          filler: "000000000000000",
          anticipationFee: "000000000000000",
          liquidValue: "000000000009103",
          anticipationNumber: "00000000000",
          exportType: "01",
          status: "01",
          product: "018",
          operator: "028",
          bank: "422",
          agency: "29    ",
          account: "264324              ",
          reconciliationId:
            "                                                  ",
          filler2: "                                         ",
        },
      ],
      cancellations: [
        {
          registerType: "12",
          sequentialNumber: "0015370",
          establishmentNumber: "86754629       ",
          establishmentName: "APP Filial 31                 ",
          lotNumber: "054249236",
          installment: "0 ",
          plan: "10",
          nsu: "18576769       ",
          authorization: "005999         ",
          card: "534516******3761    ",
          saleDate: "20211124",
          creditDate: "20220725",
          grossValue: "-00000000015640",
          administrativeFee: "-00000000000352",
          liquidValue: "-00000000015640",
          filler: "           0102",
          exportType: "01",
          status: "02",
          product: "018",
          operator: "001",
          bank: "422",
          agency: "29    ",
          account: "3331421             ",
          reconciliationId:
            "                                                  ",
          description: "CANCELAMENTO DE VENDA                             ",
          filler2: "                     ",
        },
        {
          registerType: "12",
          sequentialNumber: "0015371",
          establishmentNumber: "87138204       ",
          establishmentName: "APP Filial 50                 ",
          lotNumber: "031849476",
          installment: "10",
          plan: "10",
          nsu: "754985227      ",
          authorization: "027501         ",
          card: "535081******3074    ",
          saleDate: "20210922",
          creditDate: "20220725",
          grossValue: "-00000000005664",
          administrativeFee: "-00000000000134",
          liquidValue: "-00000000005664",
          filler: "           0102",
          exportType: "01",
          status: "02",
          product: "018",
          operator: "001",
          bank: "341",
          agency: "364   ",
          account: "322859              ",
          reconciliationId:
            "                                                  ",
          description: "CANCELAMENTO DE VENDA                             ",
          filler2: "                     ",
        },
      ],
      trailler: {
        registerType: "99",
        sequentialNumber: "0015372",
        quantity: "0000002",
        filler:
          "                                                                                                                                                                                                                                                                                                                                             ",
      },
    };

    expect(data).toStrictEqual(expected);
  });

  it("should be able to parse data", () => {
    const content = {
      header: {
        registerType: "00",
        sequentialNumber: "0000001",
        cnpj: "027936211000197",
        generationDate: "20220725",
        generationHour: "1415",
        description: "EXPORTACAO ASCARTOES     ",
        layoutVersion: "003",
        filler: "",
      },
      transactions: [
        {
          registerType: "11",
          sequentialNumber: "0000002",
          establishmentNumber: "027936211000600",
          establishmentName: "FILIAL 06                     ",
          lotNumber: "000024712",
          installment: "12",
          plan: "12",
          nsu: "22137192929    ",
          authorization: "024712         ",
          card: "000527407******7765 ",
          saleDate: "20210728",
          creditDate: "20220725",
          grossValue: "000000000016916",
          administrativeFee: "000000000000341",
          filler: "000000000000000",
          anticipationFee: "000000000000000",
          liquidValue: "000000000016575",
          anticipationNumber: "00000000000",
          exportType: "01",
          status: "01",
          product: "018",
          operator: "028",
          bank: "422",
          agency: "29    ",
          account: "264324              ",
          reconciliationId:
            "                                                  ",
          filler2: "                                         ",
        },
        {
          registerType: "11",
          sequentialNumber: "0000003",
          establishmentNumber: "027936211000600",
          establishmentName: "FILIAL 06                     ",
          lotNumber: "000094600",
          installment: "12",
          plan: "12",
          nsu: "22138613318    ",
          authorization: "094600         ",
          card: "000527407******9175 ",
          saleDate: "20210729",
          creditDate: "20220725",
          grossValue: "000000000009290",
          administrativeFee: "000000000000187",
          filler: "000000000000000",
          anticipationFee: "000000000000000",
          liquidValue: "000000000009103",
          anticipationNumber: "00000000000",
          exportType: "01",
          status: "01",
          product: "018",
          operator: "028",
          bank: "422",
          agency: "29    ",
          account: "264324              ",
          reconciliationId:
            "                                                  ",
          filler2: "                                         ",
        },
      ],
      cancellations: [
        {
          registerType: "12",
          sequentialNumber: "0015370",
          establishmentNumber: "86754629       ",
          establishmentName: "APP Filial 31                 ",
          lotNumber: "054249236",
          installment: "0 ",
          plan: "10",
          nsu: "18576769       ",
          authorization: "005999         ",
          card: "534516******3761    ",
          saleDate: "20211124",
          creditDate: "20220725",
          grossValue: "-00000000015640",
          administrativeFee: "-00000000000352",
          liquidValue: "-00000000015640",
          filler: "           0102",
          exportType: "01",
          status: "02",
          product: "018",
          operator: "001",
          bank: "422",
          agency: "29    ",
          account: "3331421             ",
          reconciliationId:
            "                                                  ",
          description: "CANCELAMENTO DE VENDA                             ",
          filler2: "                     ",
        },
        {
          registerType: "12",
          sequentialNumber: "0015371",
          establishmentNumber: "87138204       ",
          establishmentName: "APP Filial 50                 ",
          lotNumber: "031849476",
          installment: "10",
          plan: "10",
          nsu: "754985227      ",
          authorization: "027501         ",
          card: "535081******3074    ",
          saleDate: "20210922",
          creditDate: "20220725",
          grossValue: "-00000000005664",
          administrativeFee: "-00000000000134",
          liquidValue: "-00000000005664",
          filler: "           0102",
          exportType: "01",
          status: "02",
          product: "018",
          operator: "001",
          bank: "341",
          agency: "364   ",
          account: "322859              ",
          reconciliationId:
            "                                                  ",
          description: "CANCELAMENTO DE VENDA                             ",
          filler2: "                     ",
        },
      ],
      trailler: {
        registerType: "99",
        sequentialNumber: "0015372",
        quantity: "0000002",
        filler:
          "                                                                                                                                                                                                                                                                                                                                             ",
      },
    };

    const api = new FluentAPI({ content });

    const data = api.parseData().build();

    const expected = {
      header: {
        registerType: 0,
        sequentialNumber: 1,
        cnpj: 27936211000197,
        generationDate: 20220725,
        generationHour: 1415,
        description: "EXPORTACAO ASCARTOES",
        layoutVersion: 3,
        filler: "",
      },
      transactions: [
        {
          registerType: 11,
          sequentialNumber: 2,
          establishmentNumber: "027936211000600",
          establishmentName: "FILIAL 06",
          lotNumber: 24712,
          installment: "12",
          plan: "12",
          nsu: "22137192929",
          authorization: "024712",
          card: "000527407******7765",
          saleDate: 20210728,
          creditDate: 20220725,
          grossValue: 16916,
          administrativeFee: 341,
          filler: 0,
          anticipationFee: 0,
          liquidValue: 16575,
          anticipationNumber: 0,
          exportType: 1,
          status: 1,
          product: 18,
          operator: 28,
          bank: 422,
          agency: "29",
          account: "264324",
          reconciliationId: "",
          filler2: "",
        },
        {
          registerType: 11,
          sequentialNumber: 3,
          establishmentNumber: "027936211000600",
          establishmentName: "FILIAL 06",
          lotNumber: 94600,
          installment: "12",
          plan: "12",
          nsu: "22138613318",
          authorization: "094600",
          card: "000527407******9175",
          saleDate: 20210729,
          creditDate: 20220725,
          grossValue: 9290,
          administrativeFee: 187,
          filler: 0,
          anticipationFee: 0,
          liquidValue: 9103,
          anticipationNumber: 0,
          exportType: 1,
          status: 1,
          product: 18,
          operator: 28,
          bank: 422,
          agency: "29",
          account: "264324",
          reconciliationId: "",
          filler2: "",
        },
      ],
      cancellations: [
        {
          registerType: 12,
          sequentialNumber: 15370,
          establishmentNumber: "86754629",
          establishmentName: "APP Filial 31",
          lotNumber: 54249236,
          installment: "0",
          plan: "10",
          nsu: "18576769",
          authorization: "005999",
          card: "534516******3761",
          saleDate: 20211124,
          creditDate: 20220725,
          grossValue: -15640,
          administrativeFee: -352,
          liquidValue: -15640,
          filler: "0102",
          exportType: 1,
          status: 2,
          product: 18,
          operator: 1,
          bank: 422,
          agency: "29",
          account: "3331421",
          reconciliationId: "",
          description: "CANCELAMENTO DE VENDA",
          filler2: "",
        },
        {
          registerType: 12,
          sequentialNumber: 15371,
          establishmentNumber: "87138204",
          establishmentName: "APP Filial 50",
          lotNumber: 31849476,
          installment: "10",
          plan: "10",
          nsu: "754985227",
          authorization: "027501",
          card: "535081******3074",
          saleDate: 20210922,
          creditDate: 20220725,
          grossValue: -5664,
          administrativeFee: -134,
          liquidValue: -5664,
          filler: "0102",
          exportType: 1,
          status: 2,
          product: 18,
          operator: 1,
          bank: 341,
          agency: "364",
          account: "322859",
          reconciliationId: "",
          description: "CANCELAMENTO DE VENDA",
          filler2: "",
        },
      ],
      trailler: {
        registerType: 99,
        sequentialNumber: 15372,
        quantity: 2,
        filler: "",
      },
    };

    expect(data).toStrictEqual(expected);
  });
});