import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import {
  FaCheck,
  FaMinus,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(63, 81, 181, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(63, 81, 181, 0); }
  100% { box-shadow: 0 0 0 0 rgba(63, 81, 181, 0); }
`;

const CheckboxContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.3s ease-out;
`;

const CheckboxTitle = styled.h2`
  color: #3f51b5;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const CheckboxList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CheckboxItem = styled.li`
  margin-bottom: 0.5rem;
  position: relative;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.isFocused ? "#f5f5ff" : "transparent")};

  &:hover {
    background: #f5f5ff;
  }
`;

const CheckboxInput = styled.input`
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
  border: 2px solid ${(props) => (props.checked ? "#3f51b5" : "#aaa")};
  border-radius: 4px;
  margin-right: 12px;
  background: ${(props) => (props.checked ? "#3f51b5" : "white")};
  transition: all 0.2s;
  position: relative;

  ${(props) =>
    props.indeterminate &&
    css`
      background: #3f51b5;
      border-color: #3f51b5;
    `}

  ${(props) =>
    props.checked &&
    !props.indeterminate &&
    css`
      animation: ${pulse} 0.5s ease-out;
    `}
`;

const CheckboxText = styled.span`
  flex: 1;
  font-size: 1rem;
  color: #333;
`;

const ChildrenContainer = styled.div`
  margin-left: 32px;
  padding-left: 8px;
  border-left: 2px dashed #e0e0e0;
  overflow: hidden;
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  transition: max-height 0.3s ease-in-out;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  ${(props) =>
    props.isOpen &&
    css`
      transform: rotate(0deg);
    `}

  ${(props) =>
    !props.isOpen &&
    css`
      transform: rotate(-90deg);
    `}
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin-top: 1rem;
  padding: 0.5rem;
  background: #ffebee;
  border-radius: 4px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled(Button)`
  background: #3f51b5;
  color: white;
`;

const SecondaryButton = styled(Button)`
  background: #f5f5f5;
  color: #333;
`;

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
}) => {
  const [isOpen, setIsOpen] = useState(level < 1);
  const [isFocused, setIsFocused] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(!checked);
    } else if (e.key === "ArrowRight" && !isOpen) {
      setIsOpen(true);
    } else if (e.key === "ArrowLeft" && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <CheckboxItem>
      <CheckboxLabel
        htmlFor={id}
        isFocused={isFocused}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        {children && (
          <ToggleButton
            type="button"
            onClick={handleToggle}
            isOpen={isOpen}
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? (
              <FaChevronDown size={14} />
            ) : (
              <FaChevronRight size={14} />
            )}
          </ToggleButton>
        )}

        <CheckboxInput
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
        />

        <CustomCheckbox
          checked={checked}
          indeterminate={indeterminate}
          aria-hidden="true"
        >
          {indeterminate ? (
            <FaMinus size={10} color="white" />
          ) : checked ? (
            <FaCheck size={10} color="white" />
          ) : null}
        </CustomCheckbox>

        <CheckboxText>{label}</CheckboxText>
      </CheckboxLabel>

      {children && (
        <ChildrenContainer isOpen={isOpen}>
          <CheckboxList>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                level: level + 1,
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
              })
            )}
          </CheckboxList>
        </ChildrenContainer>
      )}
    </CheckboxItem>
  );
};

const NestedCheckbox = ({
  data,
  title = "Select Options",
  required = false,
  onSubmit,
  initialSelected = [],
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (initialSelected.length > 0) {
      setSelectedItems(initialSelected);
    }
  }, [initialSelected]);

  const flattenTree = (nodes, parentId = null) => {
    let flatList = [];

    nodes.forEach((node) => {
      const item = { ...node, parentId };
      flatList.push(item);

      if (node.children) {
        flatList = [...flatList, ...flattenTree(node.children, node.id)];
      }
    });

    return flatList;
  };

  const allItems = flattenTree(data);

  const getAllChildrenIds = (parentId) => {
    const children = allItems.filter((item) => item.parentId === parentId);
    let ids = children.map((child) => child.id);

    children.forEach((child) => {
      ids = [...ids, ...getAllChildrenIds(child.id)];
    });

    return ids;
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
    setTouched(true);
    setError("");

    let newSelected = [...selectedItems];
    const allChildren = getAllChildrenIds(id);

    if (checked) {
      newSelected = [...newSelected, id, ...allChildren];
      newSelected = [...new Set(newSelected)];
    } else {
      newSelected = newSelected.filter(
        (itemId) => itemId !== id && !allChildren.includes(itemId)
      );
    }

    const parents = getAllParentIds(id);
    parents.forEach((parentId) => {
      const parentChildren = allItems.filter(
        (item) => item.parentId === parentId
      );
      const parentChildrenIds = parentChildren.map((child) => child.id);

      const allChildrenSelected = parentChildrenIds.every((childId) =>
        newSelected.includes(childId)
      );
      const someChildrenSelected = parentChildrenIds.some((childId) =>
        newSelected.includes(childId)
      );

      if (allChildrenSelected) {
        if (!newSelected.includes(parentId)) {
          newSelected.push(parentId);
        }
      } else if (someChildrenSelected) {
        if (!newSelected.includes(parentId)) {
          newSelected.push(parentId);
        }
      } else {
        newSelected = newSelected.filter((itemId) => itemId !== parentId);
      }
    });

    setSelectedItems(newSelected);
  };

  const isChecked = (id) => {
    return selectedItems.includes(id);
  };

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

  const toggleSelectAll = (select) => {
    setTouched(true);
    setError("");

    if (select) {
      const leafNodes = allItems.filter(
        (item) => !allItems.some((child) => child.parentId === item.id)
      );
      setSelectedItems(leafNodes.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSubmit = () => {
    if (required && selectedItems.length === 0) {
      setError("Please select at least one option");
      return;
    }

    onSubmit?.(selectedItems);
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
      >
        {node.children && renderTree(node.children)}
      </Checkbox>
    ));
  };

  return (
    <CheckboxContainer>
      <CheckboxTitle>{title}</CheckboxTitle>

      <CheckboxList>{renderTree(data)}</CheckboxList>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ActionButtons>
        <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
        <SecondaryButton onClick={() => toggleSelectAll(true)}>
          Select All
        </SecondaryButton>
        <SecondaryButton onClick={() => toggleSelectAll(false)}>
          Deselect All
        </SecondaryButton>
      </ActionButtons>
    </CheckboxContainer>
  );
};

const App = () => {
  const checkboxData = [
    {
      id: "category1",
      label: "Electronics",
      children: [
        {
          id: "subcategory1",
          label: "Computers",
          children: [
            { id: "item1", label: "Laptops" },
            { id: "item2", label: "Desktops" },
            { id: "item3", label: "Tablets" },
          ],
        },
        {
          id: "subcategory2",
          label: "Phones",
          children: [
            { id: "item4", label: "Smartphones" },
            { id: "item5", label: "Accessories" },
          ],
        },
      ],
    },
    {
      id: "category2",
      label: "Home & Kitchen",
      children: [
        { id: "item6", label: "Furniture" },
        { id: "item7", label: "Appliances" },
        { id: "item8", label: "Cookware" },
      ],
    },
    {
      id: "category3",
      label: "Books",
      children: [
        {
          id: "subcategory3",
          label: "Fiction",
          children: [
            { id: "item9", label: "Sci-Fi" },
            { id: "item10", label: "Fantasy" },
          ],
        },
        { id: "item11", label: "Non-Fiction" },
      ],
    },
  ];

  const handleSubmit = (selectedItems) => {
    console.log("Selected items:", selectedItems);
    alert(`You selected ${selectedItems.length} items`);
  };

  return (
    <div>
      <NestedCheckbox
        data={checkboxData}
        title="Select Products"
        onSubmit={handleSubmit}
        required={true}
      />
    </div>
  );
};

export default App;
