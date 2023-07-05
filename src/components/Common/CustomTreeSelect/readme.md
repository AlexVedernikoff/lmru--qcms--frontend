# Компонент принимает следующие пропсы:

interface IProps {
className?: string;
nomenclatureValue: INomenclatureValue;
handleChange: (result: INomenclatureValue) => void;
}

# 1 className

опционально. Имя класса для дополнительной стилизации.

# 2 nomenclatureValue

предыдущее состояние в виде объекта из четырёх массивов

# 2.1. В случае товарной номенклатуры

{
"productModelNomenclatureDepartmentId": ["string"],
"productModelNomenclatureSubdepartmentId": ["string"],
"productModelNomenclatureConsolidationId": ["string"],
"productModelNomenclatureCodeId": ["string"],
}

# 2.2. В случае управленческой номенклатуры

{
"productManagementNomenclatureDepartmentId": ["integer"],
"productManagementNomenclatureSubdepartmentId": ["integer"],
"productManagementNomenclatureTypeId": ["integer"],
"productManagementNomenclatureSubtypeId": ["integer"],
}

# 3 функцию handleChange,

которой в качестве агумента передаётся новое состояние в виде объекта структуры #2.1 или #2.2
