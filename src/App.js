import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import {
  FaCheck,
  FaMinus,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

// ========== Animations ==========
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(101, 87, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(101, 87, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(101, 87, 255, 0); }
`;

const slideDown = keyframes`
  from { max-height: 0; opacity: 0; }
  to { max-height: 1000px; opacity: 1; }
`;

// ========== Styled Components ==========
const Container = styled.div`
  font-family: "Inter", sans-serif;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.4s ease-out;
`;

const Title = styled.h2`
  color: #6557ff;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  margin-bottom: 4px;
  position: relative;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.isFocused ? "#f8f7ff" : "transparent")};
  position: relative;
  overflow: hidden;

  &:hover {
    background: #f8f7ff;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(101, 87, 255, 0.1), transparent);
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const CustomCheckbox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => (props.checked ? "#6557ff" : "#d1d1d1")};
  border-radius: 5px;
  margin-right: 12px;
  background: ${(props) => (props.checked ? "#6557ff" : "white")};
  transition: all 0.2s;
  position: relative;
  flex-shrink: 0;

  ${(props) =>
    props.indeterminate &&
    css`
      background: #6557ff;
      border-color: #6557ff;
    `}

  ${(props) =>
    props.checked &&
    !props.indeterminate &&
    css`
      animation: ${pulse} 0.5s ease-out;
    `}
`;

const Text = styled.span`
  flex: 1;
  font-size: 0.95rem;
  color: #333;
  font-weight: ${(props) => (props.hasChildren ? "500" : "400")};
`;

const ChildrenContainer = styled.div`
  margin-left: 38px;
  padding-left: 10px;
  border-left: 2px dashed rgba(101, 87, 255, 0.2);
  overflow: hidden;
  animation: ${slideDown} 0.3s ease-out;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-right: 4px;

  &:hover {
    color: #6557ff;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9f9ff;
  border-radius: 12px;
  border: 1px solid rgba(101, 87, 255, 0.1);
  animation: ${fadeIn} 0.4s ease-out;
`;

const ResultsTitle = styled.h3`
  color: #6557ff;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ResultItem = styled.li`
  background: #6557ff;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(101, 87, 255, 0.2);
  }
`;

const PrimaryButton = styled(Button)`
  background: #6557ff;
  color: white;
`;

const SecondaryButton = styled(Button)`
  background: #f0f0f0;
  color: #555;

  &:hover {
    background: #e0e0e0;
  }
`;

// ========== Components ==========
const Checkbox = ({
  id,
  label,
  checked,
  indeterminate,
  onChange,
  children,
  level = 0,
  onFocus,
  onBlur,
  hasChildren,
}) => {
  const [isOpen, setIsOpen] = useState(level < 1);
  const [isFocused, setIsFocused] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Item>
      <Label htmlFor={id} isFocused={isFocused}>
        {hasChildren && (
          <ToggleButton
            type="button"
            onClick={handleToggle}
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? (
              <FaChevronDown size={14} />
            ) : (
              <FaChevronRight size={14} />
            )}
          </ToggleButton>
        )}

        <Input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <CustomCheckbox checked={checked} indeterminate={indeterminate}>
          {indeterminate ? (
            <FaMinus size={10} color="white" />
          ) : (
            checked && <FaCheck size={10} color="white" />
          )}
        </CustomCheckbox>

        <Text hasChildren={hasChildren}>{label}</Text>
      </Label>

      {hasChildren && isOpen && (
        <ChildrenContainer>
          <List>{children}</List>
        </ChildrenContainer>
      )}
    </Item>
  );
};

const NestedCheckbox = ({ data, title, required, initialSelected }) => {
  const [selectedItems, setSelectedItems] = useState(initialSelected || []);
  const [showResults, setShowResults] = useState(false);

  const flattenTree = (nodes, parentId = null) => {
    return nodes.reduce((acc, node) => {
      const item = { ...node, parentId };
      return [
        ...acc,
        item,
        ...(node.children ? flattenTree(node.children, node.id) : []),
      ];
    }, []);
  };

  const allItems = flattenTree(data);

  const getAllChildrenIds = (parentId) => {
    const children = allItems.filter((item) => item.parentId === parentId);
    return children.reduce(
      (acc, child) => [...acc, child.id, ...getAllChildrenIds(child.id)],
      []
    );
  };

  const getAllParentIds = (childId) => {
    const parents = [];
    let currentId = childId;

    while (true) {
      const item = allItems.find((item) => item.id === currentId);
      if (!item || !item.parentId) break;
      parents.push(item.parentId);
      currentId = item.parentId;
    }

    return parents;
  };

  const handleCheckboxChange = (id, checked) => {
    let newSelected = [...selectedItems];
    const allChildren = getAllChildrenIds(id);
    const parents = getAllParentIds(id);

    if (checked) {
      // Add item, its children, and parents if needed
      newSelected = [...new Set([...newSelected, id, ...allChildren])];

      // Add parents if all their children are selected
      parents.forEach((parentId) => {
        const parentChildren = allItems.filter(
          (item) => item.parentId === parentId
        );
        const parentChildrenIds = parentChildren.map((child) => child.id);
        if (
          parentChildrenIds.every((childId) => newSelected.includes(childId))
        ) {
          newSelected = [...new Set([...newSelected, parentId])];
        }
      });
    } else {
      // Remove item, its children, and parents
      newSelected = newSelected.filter(
        (itemId) => itemId !== id && !allChildren.includes(itemId)
      );

      // Remove any parents that might have been selected
      parents.forEach((parentId) => {
        newSelected = newSelected.filter((itemId) => itemId !== parentId);
      });
    }

    setSelectedItems(newSelected);
  };

  const toggleSelectAll = (select) => {
    if (select) {
      // Select all items (both parents and children)
      setSelectedItems(allItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const isChecked = (id) => selectedItems.includes(id);

  const isIndeterminate = (id) => {
    const children = allItems.filter((item) => item.parentId === id);
    if (children.length === 0) return false;

    const someSelected = children.some((child) =>
      selectedItems.includes(child.id)
    );
    const allSelected = children.every((child) =>
      selectedItems.includes(child.id)
    );

    return someSelected && !allSelected;
  };

  const renderTree = (nodes) => {
    return nodes.map((node) => (
      <Checkbox
        key={node.id}
        id={node.id}
        label={node.label}
        checked={isChecked(node.id)}
        indeterminate={isIndeterminate(node.id)}
        onChange={(checked) => handleCheckboxChange(node.id, checked)}
        hasChildren={!!node.children}
      >
        {node.children && renderTree(node.children)}
      </Checkbox>
    ));
  };

  const selectedLabels = selectedItems
    .map((id) => {
      const item = allItems.find((item) => item.id === id);
      return item ? item.label : null;
    })
    .filter(Boolean);

  return (
    <Container>
      <Title>
        <FaCheck style={{ opacity: 0.7 }} />
        {title || "Select Options"}
      </Title>

      <List>{renderTree(data)}</List>

      <Actions>
        <PrimaryButton onClick={() => setShowResults(true)}>
          <FaCheck /> Show Selection
        </PrimaryButton>
        <SecondaryButton onClick={() => toggleSelectAll(true)}>
          <FaCheck /> Select All
        </SecondaryButton>
        <SecondaryButton onClick={() => toggleSelectAll(false)}>
          <FaMinus /> Clear All
        </SecondaryButton>
      </Actions>

      {showResults && selectedLabels.length > 0 && (
        <ResultsContainer>
          <ResultsTitle>
            <FaCheck /> Selected Items ({selectedLabels.length})
          </ResultsTitle>
          <ResultsList>
            {selectedLabels.map((label, index) => (
              <ResultItem key={index}>
                <FaCheck size={12} /> {label}
              </ResultItem>
            ))}
          </ResultsList>
        </ResultsContainer>
      )}
    </Container>
  );
};

const App = () => {
  const data = [
    {
      id: "electronics",
      label: "Electronics",
      children: [
        {
          id: "phones",
          label: "Phones",
          children: [
            { id: "iphone", label: "iPhone" },
            { id: "samsung", label: "Samsung" },
            { id: "google", label: "Google Pixel" },
          ],
        },
        {
          id: "computers",
          label: "Computers",
          children: [
            {
              id: "laptops",
              label: "Laptops",
              children: [
                { id: "macbook", label: "MacBook Pro" },
                { id: "surface", label: "Surface Laptop" },
              ],
            },
            { id: "desktops", label: "Desktops" },
          ],
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      children: [
        { id: "chairs", label: "Chairs" },
        { id: "tables", label: "Tables" },
        { id: "sofas", label: "Sofas" },
      ],
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <NestedCheckbox data={data} title="Product Categories" />
    </div>
  );
};

export default App;
